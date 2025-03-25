import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import PaybandApplyTable from './PaybandApplyTable';
import Button from '#components/Button';

function PaybandApplyArea({ type }) {
  /* Sample Data */
  const initialPaybandApplyData = [
    {
      isChecked: false,
      emp_num: 'Pd000111',
      name: '홍',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000222',
      name: '홍길',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000333',
      name: '홍길동',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000444',
      name: '홍길동김',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000555',
      name: '홍길동김박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000666',
      name: '홍길동김박이',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000777',
      name: '한길동김',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000888',
      name: '김치박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: false,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
    {
      isChecked: false,
      emp_num: 'Pd000999',
      name: '홍동박',
      dep_name: '에너지조선마케팅실 산기플랜트팀',
      grade_name: 'P6',
      rank_name: 'A',
      std_salary: '50,000,000',
      upper_limit_price: '50,000,000',
      lower_limit_price: '20,000,000',
      in_payband_use_group: true,
      remarks: '초과하는 내용은 클릭하면 표시되도록...',
    },
  ];

  const [paybandApplyData, setPaybandApplyData] = useState(
    initialPaybandApplyData,
  );

  /* Payband 적용 대상 여부 Switch 관리 */
  const handlePaybandApplyGroupSwitch = (empNums, isOn) => {
    setPaybandApplyData((prevData) => {
      if (Array.isArray(empNums)) {
        return prevData.map((item) =>
          empNums.includes(item.emp_num)
            ? { ...item, in_payband_use_group: isOn }
            : item,
        );
      }
      if (typeof empNums === 'string') {
        return prevData.map((item) =>
          item.emp_num === empNums
            ? { ...item, in_payband_use_group: isOn }
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
    setPaybandApplyData((prevData) => {
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
      paybandApplyData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      ),
    );
  }, [paybandApplyData, currentPage, rowsPerPage]);

  return (
    <div className={styles['payband-apply-area']}>
      <div className={styles['payband-apply-area-header']}>
        <p>필터 추가</p>
        <Button variant="secondary" size="large" label="엑셀다운로드" />
      </div>
      <PaybandApplyTable
        type={type}
        data={tableData}
        checkedItems={checkedItems}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
        handlePaybandApplyGroupSwitch={handlePaybandApplyGroupSwitch}
        handleCheckBox={handleCheckBox}
      />
    </div>
  );
}

PaybandApplyArea.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
};

export default PaybandApplyArea;
