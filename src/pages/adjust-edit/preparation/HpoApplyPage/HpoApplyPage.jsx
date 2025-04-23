import { useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import constant from '#src/constant';
import sortObject from '#utils/sortObject';
import FilterSort from './FilterSort';
import HighOrganizationTable from './HpoApplyTable';
import styles from './hpo-apply-page.module.css';
import '#styles/global.css';

/* Filter Option */
const filterOptions = {
  직번: { optionType: 'text', initialValue: '' },
  성명: {
    optionType: 'text',
    initialValue: '',
  },
  부서명: {
    optionType: 'text',
    initialValue: '',
  },
  직급명: {
    optionType: 'text',
    initialValue: '',
  },
  평가등급: {
    optionType: 'dropdown',
    options: ['S', 'A', 'B+', 'B', 'C'],
    initialValue: '',
  },
};

/* Sort Option */
const sortOptions = {
  keys: [
    '직번',
    '성명',
    '부서명',
    '직급명',
    '평가등급',
    '고성과조직 가산 대상 여부',
  ],
  values: ['오름차순', '내림차순'],
};

function HpoApplyPage() {
  /* Backend API 연결 */
  const [highOrganizationData, setHighOrganizationData] = useState(null);

  const { addError } = useErrorHandlerContext();

  const fetchWithAuth = useFetchWithAuth();

  const { data: initialHighOrganizationData } = useSWR(
    '/adjust/1/preparation/high-performance',
    async (url) => {
      const res = await fetchWithAuth(url);
      if (!res?.ok) {
        addError(
          `Sent Request to /api/notfound (${process.env.REACT_APP_API_URL}) and the connection refused.`,
          'error message',
          'CONNECTION_REFUSED',
        );
      }
      const resJson = await res.json();

      const processed = resJson.highPerformanceEmployees.map(
        ({
          employeeId,
          empNum,
          name,
          depName,
          gradeName,
          rankName,
          isInHpo,
        }) => ({
          isChecked: false,
          employeeId,
          직번: empNum,
          성명: name,
          부서명: depName,
          직급명: gradeName,
          평가등급: rankName,
          '고성과조직 가산 대상 여부': isInHpo,
        }),
      );
      resJson.highPerformanceEmployees = processed;

      return resJson;
    },
    {
      onSuccess: (response) => {
        setHighOrganizationData(response.highPerformanceEmployees);
      },
    },
  );

  const salaryIncrementByRank = useMemo(() => {
    const salaryIncrementArray =
      initialHighOrganizationData?.salaryIncrementByRank || [];

    const calculatedSalaryPerRank = salaryIncrementArray.reduce(
      (accumulator, currentItem) => {
        const grade = currentItem.gradeName;
        const rank = currentItem.rankCode;
        const incrementRate = currentItem.salaryIncrementRate;
        const bonusValue = currentItem.bonusMultiplier;

        if (!accumulator[grade]) {
          accumulator[grade] = {};
        }
        if (!accumulator[grade][rank]) {
          accumulator[grade][rank] = {};
        }
        accumulator[grade][rank] = {
          salaryIncrementRate: incrementRate,
          bonusMultiplier: bonusValue,
        };

        return accumulator;
      },
      {},
    );

    return calculatedSalaryPerRank;
  }, [initialHighOrganizationData]);

  const hpoSalaryInfo = useMemo(
    () => initialHighOrganizationData?.hpoSalaryInfo,
    [initialHighOrganizationData],
  );

  /* 고성과조직 Table 가산대상 여부 Switch 관리 */
  const handleHighPerformGroupSwitch = (empNumsArray, isOn) => {
    setHighOrganizationData((prevData) => {
      return prevData.map((item) =>
        empNumsArray.includes(item['직번'])
          ? { ...item, '고성과조직 가산 대상 여부': isOn }
          : item,
      );
    });
  };

  /* Checked Item들을 담는 배열 */
  const [checkedItems, setCheckedItems] = useState([]);

  /* CheckBox 전체 선택, 취소 담당 함수 */
  const checkAll = (isSelect) => {
    if (isSelect) {
      setCheckedItems(highOrganizationData.map((item) => item['직번']));
      setHighOrganizationData((prevData) =>
        prevData.map((item) => ({ ...item, isChecked: true })),
      );
    } else {
      setCheckedItems([]);
      setHighOrganizationData((prevData) =>
        prevData.map((item) => ({ ...item, isChecked: false })),
      );
    }
  };

  /* Checkbox 선택시 CheckItem 배열 Update하고, Table Data에 Check 표시 */
  const handleCheckBox = (empNum, isChecked) => {
    const newCheckedState = !isChecked;
    // Checked된 Item 배열 Update
    setCheckedItems((prev) =>
      newCheckedState
        ? [...prev, empNum]
        : prev.filter((num) => num !== empNum),
    );

    // 기존 Sample Data에 Check 표시
    setHighOrganizationData((prevData) => {
      return prevData.map((item) =>
        item['직번'] === empNum
          ? { ...item, isChecked: newCheckedState }
          : item,
      );
    });
  };

  /* 총 페이지 수, 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* Table에 적용되는 Filter, Sort 조건들을 저장하는 배열 */
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  // TableOption에 onSubmit시 동작하는 함수 */
  const handleFilterSortModal = (data) => {
    const { type, payload } = data;

    if (type === 'filter') {
      setFilters(payload);
    } else if (type === 'sort') {
      setSorts(payload);
    }
  };

  const processTableData = useCallback(() => {
    const filteredData = highOrganizationData?.filter((item) =>
      filters.every(({ key, value }) => {
        const itemValue = String(item[key]);
        return (
          (value?.length ?? 0) === 0 || value?.map(String).includes(itemValue)
        );
      }),
    );

    const sortedData = sortObject(
      filteredData ?? [],
      sorts?.length ? sorts : [{ key: 'employeeId', order: '오름차순' }],
    );

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages || 1);
    }

    return sortedData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    );
  }, [highOrganizationData, currentPage, rowsPerPage, filters, sorts]);

  /* 페이지 수정 사항이 있는지 확인하는 함수 -> isCommitted에 사용 */
  const isModified = () => {
    if (!initialHighOrganizationData) {
      return false;
    }
    return highOrganizationData?.some((item, index) => {
      return (
        item['고성과조직 가산 대상 여부'] !==
        initialHighOrganizationData.highPerformanceEmployees[index][
          '고성과조직 가산 대상 여부'
        ]
      );
    });
  };

  const handleSave = async () => {
    /* checkedItems 배열 초기화 */
    setCheckedItems([]);

    /* 변경된 대상 필터링 */
    const changedHighPerformGroupEmployee = highOrganizationData.reduce(
      (acc, item, index) => {
        const initialItem =
          initialHighOrganizationData.highPerformanceEmployees?.[index];
        if (
          item['고성과조직 가산 대상 여부'] !==
          initialItem?.['고성과조직 가산 대상 여부']
        ) {
          acc.push({
            employeeId: item.employeeId,
            isInHpo: item['고성과조직 가산 대상 여부'],
          });
        }
        return acc;
      },
      [],
    );

    const patchBody = {
      changedHighPerformGroupEmployee,
    };
    try {
      const res = await fetchWithAuth(
        '/adjust/1/preparation/high-performance',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patchBody),
        },
      );

      if (!res.ok) {
        throw new Error('PATCH 요청 실패');
      }

      // ✅ 최신 데이터 다시 불러오기
      await mutate('/adjust/1/preparation/high-performance');
    } catch (error) {
      addError(
        'Failed to Send Data',
        'An error occurred while sending data. Please try again later.',
        'CONNECTION_REFUSED',
      );
    }
  };

  const handleCancel = () => {
    setHighOrganizationData(
      initialHighOrganizationData.highPerformanceEmployees,
    );
  };

  return (
    <AdjustEditLayout
      prevStepPath="subject"
      nextStepPath="../main/payband"
      stepPaths={['사전 작업', '고성과조직 가산 대상 여부 설정']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommitted={!isModified()}
      stepId={constant.step.annual.preparation.highPerformance}
    >
      <section className={styles.section}>
        <h2>대상자 목록</h2>
        <p>
          인사 평가 등급이 부여된 인원의 보상 지급률 적용 여부를 최종
          결정합니다.
          <br />각 인원의 최종 평가 차등 연봉 인상률 및 경영 성과금 지급률을
          확인할 수 있습니다.
        </p>
        <div className={styles['high-organization-area']}>
          <FilterSort
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            onSubmit={handleFilterSortModal}
            filters={filters}
            sortList={sorts}
          />
          <HighOrganizationTable
            data={processTableData()}
            checkedItems={checkedItems}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
            handleHighPerformGroupSwitch={handleHighPerformGroupSwitch}
            handleCheckBox={handleCheckBox}
            checkAll={checkAll}
            salaryIncrementByRank={salaryIncrementByRank}
            hpoSalaryInfo={hpoSalaryInfo}
            originalData={initialHighOrganizationData?.highPerformanceEmployees}
            totalPage={10}
          />
        </div>
      </section>
    </AdjustEditLayout>
  );
}

export default HpoApplyPage;
