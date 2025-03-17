import PropTypes from 'prop-types';
import Button from './Button/Button';
import InputPage from './InputPage/InputPage';
import SelectPage from './SelectPage/SelectPage';
import styles from './pagination.module.css'; // ✅ 스타일 파일 추가

export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          type="sub"
          text="이전"
          disabled={currentPage === 1}
        />
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          text="다음"
          disabled={currentPage === 10}
        />
      </div>
      <InputPage
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={10}
      />
      <SelectPage currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 1,
  onPageChange: () => {},
};
