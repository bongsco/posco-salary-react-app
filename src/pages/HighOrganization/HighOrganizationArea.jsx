import { useEffect, useState } from 'react';
import styles from './high-organization-page.module.css';
import FilterSort from './FilterSort';
import HighOrganizationTable from './HighOrganizationTable';

function HighOrganizationArea() {
  /* Sample Data */
  const initialHighOrganizationData = [
    {
      isChecked: false,
      emp_num: 'Pd000111',
      name: '홍',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000222',
      name: '홍길',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: true,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000333',
      name: '홍길동',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: true,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000444',
      name: '홍길동김',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000555',
      name: '홍길동김박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000666',
      name: '홍길동김박이',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000777',
      name: '한길동김',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000888',
      name: '김치박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
    {
      isChecked: false,
      emp_num: 'Pd000999',
      name: '홍동박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      in_high_perform_group: false,
      eval_diff_increment: 2.2,
      eval_diff_bonus: 400,
    },
  ];

  const [highOrganizationData, setHighOrganizationData] = useState(
    initialHighOrganizationData,
  );

  /* 고성과가산조직 대상 여부 Switch 관리 */
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
    // 기존 Sample Data 표시
    setHighOrganizationData((prevData) => {
      return prevData.map((item) =>
        item.emp_num === empNum
          ? { ...item, isChecked: newCheckedState }
          : item,
      );
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* Table에서 Pagination을 적용해서 보여줄 Data */
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      highOrganizationData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      ),
    );
  }, [highOrganizationData, currentPage, rowsPerPage]);

  return (
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
  );
}

export default HighOrganizationArea;
