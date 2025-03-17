import PropTypes from 'prop-types';
import styles from './select-page.module.css';

export default function SelectPage({ currentPage, onPageChange }) {
  return (
    <select
      value={currentPage}
      onChange={onPageChange}
      className={styles.select}
    >
      {Array.from({ length: 20 }, (_, i) => i + 1).map((page) => (
        <option key={page} value={page}>
          {page}
        </option>
      ))}
    </select>
  );
}

SelectPage.propTypes = {
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

SelectPage.defaultProps = {
  currentPage: 1,
  onPageChange: () => {},
};
