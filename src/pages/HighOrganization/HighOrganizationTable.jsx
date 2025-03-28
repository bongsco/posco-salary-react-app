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
  /* Table Box의 헤더 체크 상태 관리 */
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  useEffect(() => {
    const allChecked = data.every((row) => checkedItems.includes(row.emp_num));
    setIsHeaderChecked(allChecked);
  }, [data, checkedItems]);

  /* Header에 Check를 하게 되면 현재 Table 요소들을 Check하게 하는 함수 */
  const handleHeaderCheckboxChange = () => {
    setIsHeaderChecked((prev) => {
      const newHeaderChecked = !prev;
      /* 현재 Table에 표시되는 데이터 */
      const allEmpNums = data.map((row) => row.emp_num);
      /* 현재 Table에 표시되는 데이터에 대해서 CheckBox 표시 수정 */
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
              key={row.emp_num}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool.isRequired,
      emp_num: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dep_name: PropTypes.string.isRequired,
      grade_name: PropTypes.string.isRequired,
      rank_name: PropTypes.string.isRequired,
      in_high_perform_group: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default HighOrganizationTable;
