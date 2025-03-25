import { useEffect, useState } from 'react';
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
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'B',
    in_high_perform_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000666',
    name: '홍길동김박이',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
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
    dep_name: '에너지조선마케팅실 산기플랜트팀',
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

function HighOrganizationPage() {
  /* 현재 수정하고 있는 테이블 데이터 */
  const [highOrganizationData, setHighOrganizationData] = useState(
    initialHighOrganizationData,
  );
  /* 취소시 마지막 저장된 데이터 */
  const [prevHighOrganizationData, setPrevHighOrganizationData] = useState(
    initialHighOrganizationData,
  );

  /* 고성과조직 Table 가산대상 여부 Switch 관리 */
  const handleHighPerformGroupSwitch = (empNums, isOn) => {
    setHighOrganizationData((prevData) => {
      if (Array.isArray(empNums)) {
        return prevData.map((item) =>
          empNums.includes(item.emp_num)
            ? { ...item, in_high_perform_group: isOn }
            : item,
        );
      }
      if (typeof empNums === 'string') {
        return prevData.map((item) =>
          item.emp_num === empNums
            ? { ...item, in_high_perform_group: isOn }
            : item,
        );
      }
      return prevData;
    });
  };

  /* Checked Item들을 담는 배열 */
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckBox = (empNum, isChecked) => {
    const newCheckedState = !isChecked;
    // Checked된 Item 배열 Update
    setCheckedItems((prev) =>
      newCheckedState
        ? [...prev, empNum]
        : prev.filter((num) => num !== empNum),
    );
    // 기존 Sample Data Check 표시
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
  /* Table에서 Pagination을 적용해서 보여줄 Data */
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    /* 페이지 이동 or 최대 갯수 변경으로 데이터가 없으면 가장 마지막 페이지로 이동하도록 로직 추가 */
    const totalPages = Math.ceil(highOrganizationData.length / rowsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    } else {
      setTableData(
        highOrganizationData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage,
        ),
      );
    }
  }, [highOrganizationData, currentPage, rowsPerPage]);

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
      <h2>대상자 목록</h2>
      <p>
        인사 평가 등급이 부여된 인원의 보상 지급률 적용 여부를 최종 결정합니다.
        <br />각 인원의 최종 평가 차등 연봉 인상률 및 경영 성과금 지급률을
        확인할 수 있습니다.
      </p>
      <div className={styles['high-organization-area']}>
        <FilterSort />
        <HighOrganizationTable
          data={tableData}
          checkedItems={checkedItems}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
          handleHighPerformGroupSwitch={handleHighPerformGroupSwitch}
          handleCheckBox={handleCheckBox}
        />
      </div>
    </AdjustEditLayout>
  );
}

export default HighOrganizationPage;
