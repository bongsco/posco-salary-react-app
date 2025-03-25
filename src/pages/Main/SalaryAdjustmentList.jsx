import PropTypes from 'prop-types';
import FilterSort from './FilterSort';
import SalaryAdjustmentTable from './SalaryAdjustmentTable';
import styles from './main-page.module.css';

function SalaryAdjustmentList({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  clickedRow,
  setClickedRow,
}) {
  return (
    <div className={styles['salary-adjustment-list']}>
      <FilterSort />
      <SalaryAdjustmentTable
        data={data}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        clickedRow={clickedRow}
        setClickedRow={setClickedRow}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

SalaryAdjustmentList.propTypes = {
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

export default SalaryAdjustmentList;
