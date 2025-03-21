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
        setClickedRow={(changeRow) => {
          setClickedRow(changeRow);
        }}
        setRowsPerPage={(changeRowsPerPage) => {
          setRowsPerPage(changeRowsPerPage);
        }}
        setCurrentPage={(changeCurrentPage) => {
          setCurrentPage(changeCurrentPage);
        }}
      />
    </div>
  );
}

SalaryAdjustmentList.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  clickedRow: PropTypes.number.isRequired,
  setClickedRow: PropTypes.func.isRequired,
};

export default SalaryAdjustmentList;
