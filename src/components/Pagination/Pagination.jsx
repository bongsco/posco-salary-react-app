import PropTypes from 'prop-types';
import Button from './Button/Button';
import InputPage from './InputPage/InputPage';
import SelectPage from './SelectPage/SelectPage';
import styles from './pagination.module.css';

export default function Pagination({ currentPage, onPageChange, template }) {
  const totalPage = 10; // ✅ 전체 페이지 수

  // ✅ 페이지 변경 핸들러 (버튼 클릭 시 실행)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      onPageChange(newPage);
    }
  };

  // ✅ template에 따라 이전/다음 버튼 동작 변경
  const handlePrev = () => {
    if (template === 'input') {
      handlePageChange(currentPage - 1);
    } else if (template === 'select') {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (template === 'input') {
      handlePageChange(currentPage + 1);
    } else if (template === 'select') {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* ✅ 이전 / 다음 버튼 */}
      <div className={styles.buttonContainer}>
        <Button
          onClick={handlePrev}
          type="sub"
          text="이전"
          disabled={currentPage === 1}
        />
        <Button
          onClick={handleNext}
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
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  template: PropTypes.oneOf(['input', 'select']), // ✅ 템플릿 선택 가능
};

Pagination.defaultProps = {
  currentPage: 1,
  onPageChange: () => {},
  template: 'input', // 기본값: input 사용
};
