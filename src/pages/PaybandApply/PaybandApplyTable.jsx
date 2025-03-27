import PropTypes from 'prop-types';
import '../../styles/table.css';
import { useEffect, useState } from 'react';
import PageNation from '#components/Pagination';
import styles from './payband-apply-page.module.css';
import PaybandApplyTableRow from './PaybandApplyTableRow';
import CheckBox from '#components/CheckBox';

function PaybandApplyTable({
  type,
  data,
  checkedItems,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  handlePaybandApplyGroupSwitch,
  handleCheckBox,
}) {
  const [isHeaderChecked, setIsHeaderChecked] = useState(false); // Header 체크박스 상태

  useEffect(() => {
    const allChecked = data.every((row) => checkedItems.includes(row.emp_num));
    setIsHeaderChecked(allChecked);
  }, [data, checkedItems]);

  const handleHeaderCheckboxChange = () => {
    setIsHeaderChecked((prev) => {
      const newHeaderChecked = !prev;
      const allEmpNums = data.map((row) => row.emp_num);
      /* 현재 Table에 표시되는 애들에 대해서 CheckBox 표시 바꾸기 */
      allEmpNums.forEach((empNum) => {
        handleCheckBox(empNum);
      });

      return newHeaderChecked;
    });
  };

  return (
    <div className={styles['payband-apply-table-area']}>
      <table className={styles['payband-apply-table']}>
        <thead>
          <tr>
            <td>
              <div className={`${styles['check-box']}`}>
                <CheckBox
                  isChecked={isHeaderChecked}
                  onClick={() => handleHeaderCheckboxChange(isHeaderChecked)}
                />
              </div>
            </td>
            <td>직번</td>
            <td>성명</td>
            <td>부서</td>
            <td>직급</td>
            <td>평가등급</td>
            <td>기준연봉 월할액</td>
            <td>상한 금액</td>
            <td>Payband 적용</td>
            <td>비고</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <PaybandApplyTableRow
              key={row.id}
              item={row}
              type={type}
              checkedItems={checkedItems}
              handlePaybandApplyGroupSwitch={handlePaybandApplyGroupSwitch}
              handleCheckBox={handleCheckBox}
            />
          ))}
        </tbody>
      </table>
      <PageNation
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
}

PaybandApplyTable.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  data: PropTypes.arrayOf().isRequired,
  checkedItems: PropTypes.arrayOf().isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handlePaybandApplyGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default PaybandApplyTable;
