import PropTypes from 'prop-types';
import PageNation from '#components/Pagination';
import AdjustTableRow from './AdjustTableRow';
import styles from './main-page.module.css';

function SalaryAdjustmentTable({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  selectedIndex,
  handleRowClick,
  handleDeleteClick,
}) {
  return (
    <div className={styles['salary-adjustment-table-area']}>
      <table className={styles['salary-adjustment-table']}>
        <thead>
          <tr>
            <td className={styles['column-year']}>연도</td>
            <td className={styles['column-month']}>월</td>
            <td className={styles['column-adj-type']}>조정유형</td>
            <td className={styles['column-status']}>상태</td>
            <td className={styles['column-interface']}>통합인사반영여부</td>
            <td className={styles['column-work-step']}>진행단계</td>
            <td className={styles['column-date']}>등록일</td>
            <td className={styles['column-creator']}>등록자</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <AdjustTableRow
              /* 나중에 table key로 id 값을 넘길 예정 */
              key={row['등록일']}
              row={row}
              index={index}
              selectedIndex={selectedIndex}
              handleRowClick={() => handleRowClick(index)}
              handleDeleteClick={handleDeleteClick}
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

SalaryAdjustmentTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      년도: PropTypes.number.isRequired,
      월구분: PropTypes.number.isRequired,
      조정제목: PropTypes.string.isRequired,
      조정종류: PropTypes.string.isRequired,
      차수: PropTypes.number.isRequired,
      통합인사반영여부: PropTypes.bool.isRequired,
      진행단계: PropTypes.string.isRequired,
      등록일: PropTypes.string.isRequired,
      '연봉 시작일': PropTypes.string.isRequired,
      '연봉 종료일': PropTypes.string.isRequired,
      등록자: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default SalaryAdjustmentTable;
