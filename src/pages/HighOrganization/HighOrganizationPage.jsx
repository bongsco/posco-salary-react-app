import { useCallback, useState } from 'react';
import styles from './high-organization-page.module.css';
import FilterSort from './FilterSort';
import HighOrganizationTable from './HighOrganizationTable';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

/* Sample Data */
const initialHighOrganizationData = [
  {
    isChecked: false,
    emp_num: 'Pd000111',
    name: '홍',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'S',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000222',
    name: '홍길',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    in_high_perform_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd000333',
    name: '홍길동',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'B',
    in_high_perform_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd000444',
    name: '홍길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'S',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000555',
    name: '홍길동김박',
    dep_name: '철강IT그룹 ERP개발섹션',
    grade_name: 'P6',
    rank_name: 'B',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000666',
    name: '홍길동김박이',
    dep_name: '철강IT그룹 ERP개발섹션',
    grade_name: 'P6',
    rank_name: 'A',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000777',
    name: '한길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000888',
    name: '김치박',
    dep_name: '철강IT그룹 ERP개발섹션',
    grade_name: 'P6',
    rank_name: 'A',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000999',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    in_high_perform_group: false,
  },
];

/* Sample Data랑 테이블 컬럼 Mapping을 위한 임시 변수 */
const nameMapping = {
  이름: 'name',
  직번: 'emp_num',
  부서: 'dep_name',
  직급: 'grade_name',
  평가등급: 'rank_name',
  고성과조직가산율: 'in_high_perform_group',
};

/* Filter Option에 대한 Sample Data */
const filterOptions = {
  직번: { optionType: 'text', initialValue: '' },
  이름: {
    optionType: 'dropdown',
    options: ['홍', '홍길', '홍길동', '홍길동김'],
    currentSelectedValue: '',
  },
  부서: {
    optionType: 'dropdown',
    options: ['에너지조선마케팅실 산기플랜트팀', '철강IT그룹 ERP개발섹션'],
    initialValue: '',
  },
  평가등급: {
    optionType: 'dropdown',
    options: ['S', 'A', 'B'],
    initialValue: '',
  },
};

/* Sort Option에 대한 Sample Data */
const sortOptions = {
  keys: ['이름', '직번', '부서', '직급', '평가등급', '고성과조직가산'],
  values: ['오름차순', '내림차순'],
};

function HighOrganizationPage() {
  /* 현재 수정하고 있는 테이블 데이터 */
  const [highOrganizationData, setHighOrganizationData] = useState(
    initialHighOrganizationData,
  );
  /* 마지막으로 저장된 데이터 */
  const [prevHighOrganizationData, setPrevHighOrganizationData] = useState(
    initialHighOrganizationData,
  );

  /* 고성과조직 Table 가산대상 여부 Switch 관리 */
  const handleHighPerformGroupSwitch = (empNumsArray, isOn) => {
    setHighOrganizationData((prevData) => {
      return prevData.map((item) =>
        empNumsArray.includes(item.emp_num)
          ? { ...item, in_high_perform_group: isOn }
          : item,
      );
    });
  };

  /* Checked Item들을 담는 배열 */
  const [checkedItems, setCheckedItems] = useState([]);

  /* CheckBox 전체 선택, 취소 담당 함수 */
  const checkAll = (isSelect) => {
    if (isSelect) {
      setCheckedItems(highOrganizationData.map((item) => item.emp_num));
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
        item.emp_num === empNum
          ? { ...item, isChecked: newCheckedState }
          : item,
      );
    });
  };

  /* 현재 페이지 수, 현재 테이블에 보여줄 데이터 수 */
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
    /* 일단은 필터, 정렬, 페이지네이션이 돌아가기만 하는 코드로 냅둠 */
    const filteredData = highOrganizationData.filter((item) =>
      filters.every(({ key, value }) => {
        const itemValue = String(item[nameMapping[key]]);
        return (
          (value?.length ?? 0) === 0 || value?.map(String).includes(itemValue)
        );
      }),
    );

    const sortedData = [...filteredData];
    sorts.forEach((sort) => {
      const { key, value: order } = sort;
      sortedData.sort((a, b) => {
        let comparison = 1;
        if (a[nameMapping[key]] < b[nameMapping[key]]) {
          comparison = -1;
        }
        if (order === '내림차순') {
          comparison *= -1;
        }
        return comparison;
      });
    });
    /* 위에까지가 정렬, 페이징 알고리즘 적용하는 코드들 */

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
    return highOrganizationData.some(
      (item, index) =>
        item.in_high_perform_group !==
        prevHighOrganizationData[index].in_high_perform_group,
    );
  };

  const handleSave = () => {
    setPrevHighOrganizationData(highOrganizationData);
  };

  const handleCancel = () => {
    setHighOrganizationData(prevHighOrganizationData);
  };

  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="../main/payband"
      stepPaths={['사전 작업', '고성과조직 가산 대상 여부 설정']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommitted={!isModified()}
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
          />
        </div>
      </section>
    </AdjustEditLayout>
  );
}

export default HighOrganizationPage;
