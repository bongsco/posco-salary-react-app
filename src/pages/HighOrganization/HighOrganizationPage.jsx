import { useCallback, useState } from 'react';
import styles from './high-organization-page.module.css';
import FilterSort from './FilterSort';
import HighOrganizationTable from './HighOrganizationTable';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import sortObject from '#utils/sortObject';

/* Sample Data */
const initialHighOrganizationData = [
  {
    isChecked: false,
    직번: 'pd09486',
    직원성명: '김서영',
    부서명: 'IT사업실 ERP운영섹션',
    직급명: 'P6',
    등급코드: 'S',
    '고성과조직 가산 대상 여부': true,
  },
  {
    isChecked: false,
    직번: 'pd08455',
    직원성명: '김종하',
    부서명: 'IT사업실 스마트팩토리개발팀',
    직급명: 'P5',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': true,
  },
  {
    isChecked: false,
    직번: 'pd08206',
    직원성명: '김현아',
    부서명: 'IT사업실 이차전지운영팀',
    직급명: 'P4',
    등급코드: 'B+',
    '고성과조직 가산 대상 여부': true,
  },
  {
    isChecked: false,
    직번: 'pd07195',
    직원성명: '이은재',
    부서명: 'IT사업실 이차전지개발팀',
    직급명: 'P3',
    등급코드: 'B',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'pd04274',
    직원성명: '한상진',
    부서명: 'IT사업실 ERP개발섹션',
    직급명: 'P2',
    등급코드: 'C',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00111',
    직원성명: '홍길동',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'S',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00222',
    직원성명: '김길호',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': true,
  },
  {
    isChecked: false,
    직번: 'Pd00333',
    직원성명: '서지현',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'B',
    '고성과조직 가산 대상 여부': true,
  },
  {
    isChecked: false,
    직번: 'Pd00444',
    직원성명: '장수민',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'S',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00555',
    직원성명: '이창진',
    부서명: 'IT사업실 ERP개발섹션',
    직급명: 'P6',
    등급코드: 'B',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00666',
    직원성명: '손서원',
    부서명: 'IT사업실 ERP개발섹션',
    직급명: 'P6',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00777',
    직원성명: '이장우',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00888',
    직원성명: '한다연',
    부서명: 'IT사업실 ERP개발섹션',
    직급명: 'P6',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': false,
  },
  {
    isChecked: false,
    직번: 'Pd00999',
    직원성명: '이기문',
    부서명: '에너지조선마케팅실 산기플랜트팀',
    직급명: 'P6',
    등급코드: 'A',
    '고성과조직 가산 대상 여부': false,
  },
];

/* Filter Option에 대한 Sample Data */
const filterOptions = {
  직번: { optionType: 'text', initialValue: '' },
  직원성명: {
    optionType: 'text',
    initialValue: '',
  },
  부서명: {
    optionType: 'dropdown',
    options: [
      '에너지조선마케팅실 산기플랜트팀',
      'IT사업실 ERP개발섹션',
      'IT사업실 ERP운영섹션',
      'IT사업실 이차전지개발팀',
      'IT사업실 이차전지운영팀',
      'IT사업실 스마트팩토리개발팀',
    ],
    initialValue: '',
  },
  등급코드: {
    optionType: 'dropdown',
    options: ['S', 'A', 'B+', 'B', 'C'],
    initialValue: '',
  },
};

/* Sort Option에 대한 Sample Data */
const sortOptions = {
  keys: [
    '직원성명',
    '직번',
    '부서명',
    '직급명',
    '등급코드',
    '고성과조직 가산 대상 여부',
  ],
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
        const itemValue = String(item[key]);
        return (
          (value?.length ?? 0) === 0 || value?.map(String).includes(itemValue)
        );
      }),
    );

    const sortedData = sortObject(filteredData, sorts);

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
        item['고성과조직 가산 대상 여부'] !==
        prevHighOrganizationData[index]['고성과조직 가산 대상 여부'],
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
