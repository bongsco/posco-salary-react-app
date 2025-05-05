import PropTypes from 'prop-types';
import Button from './Button/Button';
import PageInput from './PageInput/PageInput';
import PageSelect from './PageSelect/PageSelect';
import styles from './pagination.module.css';

export default function Pagination({
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  pageOptions = [5, 10, 15, 20],
  totalPage = 10, // ✅ 전체 페이지 수
}) {
  // ✅ 페이지 변경 핸들러 (버튼 클릭 시 실행)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      onPageChange(newPage); // 부모 컴포넌트에서 currentPage 업데이트
    }
  };

  return (
    <div className={styles.paginationContainer}>
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

      <div className={styles.inputSelectContainer}>
        <PageInput
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPage={totalPage}
        />
        <PageSelect
          rowsPerPage={rowsPerPage} // ✅ 한 페이지에 표시할 행 개수 전달
          onRowsPerPageChange={onRowsPerPageChange} // ✅ 부모에서 행 개수 변경 가능하도록 Prop 전달
          options={pageOptions}
        />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number, // ✅ 현재 페이지 필수
  onPageChange: PropTypes.func.isRequired, // ✅ 페이지 변경 핸들러 필수
  rowsPerPage: PropTypes.number, // ✅ 한 페이지에 표시할 행 개수 필수
  onRowsPerPageChange: PropTypes.func.isRequired, // ✅ 행 개수 변경 핸들러 필수
  pageOptions: PropTypes.arrayOf(PropTypes.number),
  totalPage: PropTypes.number, // ✅ 전체 페이지 수 필수
};

Pagination.defaultProps = {
  currentPage: 1,
  rowsPerPage: 10, // ✅ 기본값: 10개 행 표시
  pageOptions: [5, 10, 20, 50],
  totalPage: 10, // ✅ 기본값: 10페이지
};
