import PropTypes from 'prop-types';
import styles from './page-input.module.css';

export default function PageInput({ currentPage, onPageChange, totalPage }) {
  return (
    <div className={styles.input}>
      <div>페이지</div>
      <input type="text" value={currentPage} onChange={onPageChange} />
      <div> / {totalPage} </div>
    </div>
  );
}

PageInput.propTypes = {
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  totalPage: PropTypes.number,
};

PageInput.defaultProps = {
  currentPage: 1,
  onPageChange: () => {},
  totalPage: 10,
};
