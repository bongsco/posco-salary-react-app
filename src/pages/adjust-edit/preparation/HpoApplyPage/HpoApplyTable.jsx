import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CheckBox from '#components/CheckBox';
import PageNation from '#components/Pagination';
import TableSelectIndicator from '#components/TableSelectIndicator';
import HighOrganizationTableRow from './HpoApplyTableRow';
import styles from './hpo-apply-page.module.css';

function HighOrganizationTable({
  data,
  checkedItems,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  handleHighPerformGroupSwitch,
  handleCheckBox,
  checkAll,
  salaryIncrementByRank,
  hpoSalaryInfo,
  originalData,
}) {
  /* Table Box의 헤더 체크 상태 관리 */
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  useEffect(() => {
    const allChecked = data.every((row) => checkedItems.includes(row['직번']));
    setIsHeaderChecked(allChecked);
  }, [data, checkedItems]);

  /* Header에 Check를 하게 되면 현재 Table 요소들을 Check하게 하는 함수 */
  const handleHeaderCheckboxChange = (check) => {
    /* Check 상태가 다른 데이터만 추출 */
    const uncheckedEmpNums = data
      .filter((row) => row.isChecked === check)
      .map((row) => row['직번']);

    setIsHeaderChecked(!check);
    uncheckedEmpNums.forEach((empNum) => {
      handleCheckBox(empNum, check);
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
            <td className={styles['column-emp-num']}>직번</td>
            <td className={styles['column-name']}>성명</td>
            <td className={styles['column-dep']}>부서</td>
            <td className={styles['column-grade']}>직급</td>
            <td className={styles['column-rank']}>평가등급</td>
            <td className={styles['column-high-organization']}>
              고성과조직가산
            </td>
            <td className={styles['column-perform-add-payment']}>
              평가차등연봉인상율
            </td>
            <td className={styles['column-bonus-multiplier']}>
              평가차등경영성과금지급률
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const originalItem = originalData.find((o) => o.직번 === row.직번);

            return (
              <HighOrganizationTableRow
                key={row['직번']}
                originalItem={originalItem}
                item={row}
                checkedItems={checkedItems}
                handleHighPerformGroupSwitch={handleHighPerformGroupSwitch}
                handleCheckBox={handleCheckBox}
                salaryIncrementByRank={salaryIncrementByRank}
                hpoSalaryInfo={hpoSalaryInfo}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.tableBottom}>
        <TableSelectIndicator
          checkedItemCount={checkedItems.length}
          onSelect={() => checkAll(true)}
          onClear={() => checkAll(false)}
        />
        <PageNation
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </div>
  );
}

HighOrganizationTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool.isRequired,
      직번: PropTypes.string.isRequired,
      성명: PropTypes.string.isRequired,
      부서명: PropTypes.string.isRequired,
      직급명: PropTypes.string.isRequired,
      평가등급: PropTypes.string.isRequired,
      '고성과조직 가산 대상 여부': PropTypes.bool.isRequired,
    }),
  ).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  salaryIncrementByRank: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        salaryIncrementRate: PropTypes.number.isRequired,
        bonusMultiplier: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  hpoSalaryInfo: PropTypes.shape({
    hpoSalaryIncrementRate: PropTypes.number.isRequired,
    hpoBonusMultiplier: PropTypes.number.isRequired,
  }).isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HighOrganizationTable;
