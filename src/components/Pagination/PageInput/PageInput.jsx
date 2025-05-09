import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './page-input.module.css';

export default function PageInput({ currentPage, onPageChange, totalPage }) {
  const [inputValue, setInputValue] = useState(currentPage);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const parsed = Number(inputValue);

      if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= totalPage) {
        onPageChange(parsed);
      } else {
        setInputValue(currentPage); // 잘못된 입력은 되돌리기
      }
    }
  };

  const handleBlur = () => {
    setInputValue(currentPage);
  };

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.input}>
      <div>페이지</div>
      <input
        type="number"
        min={1}
        max={totalPage}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <div>/ {totalPage}</div>
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
