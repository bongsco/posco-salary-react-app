import PropTypes from 'prop-types';
import styles from './input-page.module.css';

export default function InputPage({ currentPage, onPageChange, totalPage }) {
  return (
    <div className={styles.input}>
      <div>페이지</div>
      <input type="text" value={currentPage} onChange={onPageChange} />
      <div> / {totalPage} </div>
    </div>
  );
}

InputPage.propTypes = {
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  totalPage: PropTypes.number,
};

InputPage.defaultProps = {
  currentPage: 1,
  onPageChange: () => {},
  totalPage: 10,
};
