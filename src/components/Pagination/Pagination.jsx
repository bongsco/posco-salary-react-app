import PropTypes from 'prop-types';
import Button from './Button/Button';
import InputPage from './InputPage/InputPage';
import SelectPage from './SelectPage/SelectPage';
import styles from './pagination.module.css';

export default function Pagination({ currentPage, onPageChange }) {
  const totalPage = 10; // ✅ 전체 페이지 수

  // ✅ 페이지 변경 핸들러 (버튼 클릭 시 실행)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      onPageChange(newPage); // 부모 컴포넌트에서 currentPage 업데이트
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* ✅ 이전 / 다음 버튼 */}
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          type="sub"
          text="이전"
          disabled={currentPage === 1}
        />
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          text="다음"
          disabled={currentPage === totalPage}
        />
      </div>

      {/* ✅ InputPage와 SelectPage는 항상 표시됨 */}
      <div className={styles.inputSelectContainer}>
        <InputPage
          currentPage={currentPage}
          onPageChange={(e) => handlePageChange(Number(e.target.value))}
          totalPage={totalPage}
        />
        <SelectPage
          currentPage={currentPage}
          onPageChange={(e) => handlePageChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number, // ✅ 현재 페이지는 필수 값
  onPageChange: PropTypes.func.isRequired, // ✅ 페이지 변경 핸들러 필수
};

Pagination.defaultProps = {
  currentPage: 1,
};
