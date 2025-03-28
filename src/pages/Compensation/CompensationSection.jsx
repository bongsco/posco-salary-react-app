import PropTypes from 'prop-types';
import Input from '#components/Input';
import CompensationTable from './CompensationTable';
import styles from './compensation-page.module.css';

/**
 * CompensationSection
 *
 * - 연봉 인상률 or 성과금 지급률 섹션을 렌더링
 * - 상단 가산률 입력 필드 + 하단 테이블로 구성됨
 * - valueKey에 따라 각 섹션에서 다루는 값(incrementRate or provideRate)이 구분됨
 */

export default function CompensationSection({
  title, // 섹션 제목
  description, // 섹션 설명 문구
  value, // 상단 input 입력값 (가산률)
  onInputChange, // 상단 input 값 변경 핸들러
  inputError, // 상단 input 유효성 오류 여부
  tableData, // 현재 보상 테이블 데이터
  originalTableData, // 백업된(커밋된) 보상 테이블 데이터 (diff 확인용)
  onTableChange, // 테이블 셀 변경 핸들러
  valueKey, // 'incrementRate' 또는 'provideRate' 구분 (섹션 타입 분기용)
  onAddGradeRow, // 행 추가 버튼 클릭시 핸들러
  hasTypeError, // 테이블 내 숫자 형식 오류 여부
  newGradeSelections, // NEW 행들의 드롭다운 선택 상태
  onSelectGrade, // 드롭다운 선택시 호출되는 함수
  checkedRows,
  setCheckedRows,
  onDeleteCheckedRows,
  isCommitted,
  availableGradeOptions,
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.inputContainer}>
        <span className={styles.inputLabel}>고성과조직 가산률</span>
        <Input
          value={value}
          onChange={onInputChange}
          mode={inputError ? 'error' : 'default'}
          customWidth={50}
          customHeight={30}
        />
        <span className={styles.inputLabel}>%</span>
      </div>

      {inputError && (
        <div className={styles.errorMessage}>
          고성과조직 가산률을 입력해 주세요.
        </div>
      )}
      <CompensationTable
        currentData={tableData}
        originalData={originalTableData}
        onChange={onTableChange}
        valueKey={valueKey}
        onAddGradeRow={onAddGradeRow}
        hasTypeError={hasTypeError}
        newGradeSelections={newGradeSelections}
        onSelectGrade={onSelectGrade}
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
        onDeleteCheckedRows={onDeleteCheckedRows}
        isCommitted={isCommitted}
        availableGradeOptions={availableGradeOptions}
      />
    </div>
  );
}

CompensationSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputError: PropTypes.bool.isRequired,
  tableData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  originalTableData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  onTableChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['incrementRate', 'provideRate']).isRequired,
  onAddGradeRow: PropTypes.func.isRequired,
  hasTypeError: PropTypes.bool.isRequired,
  newGradeSelections: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelectGrade: PropTypes.func.isRequired,
  onDeleteCheckedRows: PropTypes.func.isRequired,
  checkedRows: PropTypes.objectOf(PropTypes.bool).isRequired,
  setCheckedRows: PropTypes.func.isRequired,
  isCommitted: PropTypes.bool.isRequired,
  availableGradeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
