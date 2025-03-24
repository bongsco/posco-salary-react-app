import PropTypes from 'prop-types';
import '../../styles/table.css';
import { useEffect, useState } from 'react';
import PageNation from '#components/Pagination';
import styles from './high-organization-page.module.css';
import HighOrganizationTableRow from './HighOrganizationTableRow';
import CheckBox from '#components/CheckBox';

function HighOrganizationTable({
  data,
  checkedItems,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  handleHighPerformGroupSwitch,
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
        handleCheckBox(empNum, prev);
      });

      return newHeaderChecked;
    });
  };

  return (
    <div className={styles['high-organization-table-area']}>
      <table className={styles['high-organization-table']}>
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
            <td>고성과조직가산</td>
            <td>평가차등연봉인상율</td>
            <td>평가차등경영성과금지급률</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <HighOrganizationTableRow
              key={row.id}
              item={row}
              checkedItems={checkedItems}
              handleHighPerformGroupSwitch={handleHighPerformGroupSwitch}
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

HighOrganizationTable.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  checkedItems: PropTypes.arrayOf().isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default HighOrganizationTable;
