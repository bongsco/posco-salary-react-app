import PropTypes from 'prop-types';
import '../../styles/table.css';
import SalaryAdjustmentTableRow from './SalaryAdjustmentTableRow';
import PageNation from '#components/Pagination';
import styles from './main-page.module.css';

function SalaryAdjustmentTable({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  clickedRow,
  setClickedRow,
}) {
  const handleRowClick = (creationTimestamp) => {
    // 나중에 조정차수ID로 값 변경 예정
    /* 같은 행을 누르면 원래 Table 형태로 전환(null), 다른 행을 누르면 그 행에 Stepper 추가 */
    setClickedRow(clickedRow === creationTimestamp ? null : creationTimestamp);
  };

  const handleEditClick = (row) => {
    console.log('Edit clicked for row:', row);
  };

  const handleDeleteClick = (row) => {
    console.log('Delete clicked for row:', row);
  };

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
          {data.map((row) => (
            <SalaryAdjustmentTableRow
              key={row.creation_timestamp}
              row={row}
              clickedRow={clickedRow}
              handleRowClick={(creationTimestamp) =>
                handleRowClick(creationTimestamp)
              }
              handleEditClick={() => handleEditClick(row)}
              handleDeleteClick={() => handleDeleteClick(row)}
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
      creation_timestamp: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      order_number: PropTypes.number.isRequired,
      adj_type: PropTypes.string.isRequired,
      work_step: PropTypes.string.isRequired,
      interface_use: PropTypes.bool.isRequired,
      creator: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  clickedRow: PropTypes.number.isRequired,
  setClickedRow: PropTypes.func.isRequired,
};

export default SalaryAdjustmentTable;
