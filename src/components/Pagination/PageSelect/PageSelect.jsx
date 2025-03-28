import PropTypes from 'prop-types';
import styles from './page-select.module.css';

export default function PageSelect({
  options,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  // const options = [5, 10, 20, 50, 100]; // ✅ 선택 가능한 행 개수 옵션

  return (
    <div className={styles.pageSelectContainer}>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

PageSelect.propTypes = {
  rowsPerPage: PropTypes.number, // ✅ 현재 선택된 행 개수
  onRowsPerPageChange: PropTypes.func.isRequired, // ✅ 행 개수 변경 이벤트 핸들러
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
};

PageSelect.defaultProps = {
  rowsPerPage: 10, // ✅ 기본 행 개수: 10개
};
