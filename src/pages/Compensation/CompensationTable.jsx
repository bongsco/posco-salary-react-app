import PropTypes from 'prop-types';
import '../../styles/table.css';
import styles from './compensation-page.module.css';
import CheckBox from '#components/CheckBox';
import Button from '#components/Button';
import CompensationTableRow from './CompensationTableRow';

/**
 * CompensationTable
 *
 * - 직급/평가등급별 보상 비율 테이블 컴포넌트
 * - 상위 Section 컴포넌트에서 데이터를 받아 테이블 형태로 렌더링
 * - 각 행은 CompensationTableRow로 구성됨
 */

export default function CompensationTable({
  currentData, // 현재 입력 중인 보상 비율 데이터
  originalData, // 백업된(커밋된) 보상 테이블 데이터 (diff 확인용)
  onChange, // 셀 변경 핸들러
  valueKey, // 'incrementRate' 또는 'provideRate' 지정
  onAddGradeRow, // 행 추가 버튼 클릭 시 호출
  hasTypeError, // 테이블 내 숫자 형식 오류 여부
  newGradeSelections, // NEW 행의 드롭다운 선택 상태
  onSelectGrade, // 드롭다운 선택 이벤트 핸들러
  checkedRows,
  setCheckedRows,
  onDeleteCheckedRows,
  isCommitted,
}) {
  // 개별 행 체크박스 토글 핸들러
  const handleCheck = (grade) => {
    const updated = {
      ...checkedRows,
      [grade]: !checkedRows[grade],
    };
    setCheckedRows(updated);
  };

  return (
    <>
      {/* 테이블 헤더 상단 텍스트 */}
      <div
        className={`${styles.tableHeaderWrapper} 
        ${Object.values(checkedRows).some((v) => v) ? styles.withMarginTop : ''}`}
      >
        <div className={styles.deleteButton}>
          {Object.values(checkedRows).some((v) => v) && (
            <Button
              label="삭제"
              sizes="small"
              variant="secondary"
              onClick={onDeleteCheckedRows}
            />
          )}
        </div>
        <div className={styles.unitText}>단위 (%)</div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>
              <div className={styles.table_cell}>
                <CheckBox isChecked={false} onClick={() => {}} />
              </div>
            </td>
            <td>직급</td>
            <td>탁월(S)</td>
            <td>우수(A)</td>
            <td>충족(B+)</td>
            <td>보완필요(B)</td>
            <td>미흡(C)</td>
            <td>매우미흡(D)</td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currentData).map(([grade, ranks]) => (
            <CompensationTableRow
              key={grade}
              grade={grade}
              ranks={ranks}
              originalRanks={originalData?.[grade] ?? {}}
              checked={!!checkedRows[grade]}
              onCheck={() => handleCheck(grade)}
              onChange={onChange}
              valueKey={valueKey}
              hasTypeError={hasTypeError}
              selectedGrade={newGradeSelections[grade]}
              onSelectGrade={onSelectGrade}
              isCommitted={isCommitted}
            />
          ))}

          {/* 행 추가 버튼 영역 */}
          <tr>
            <td colSpan="8" className="button_td">
              <button
                type="button"
                className="add_column"
                aria-label="add_button"
                onClick={onAddGradeRow}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 숫자 입력 오류 메시지 */}
      {hasTypeError && (
        <div className={styles.errorMessage}>
          표에서 빈 값이나 잘못된 값을 수정해 주세요.
        </div>
      )}
    </>
  );
}

CompensationTable.propTypes = {
  currentData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  originalData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['incrementRate', 'provideRate']).isRequired,
  onAddGradeRow: PropTypes.func.isRequired,
  hasTypeError: PropTypes.bool.isRequired,
  newGradeSelections: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelectGrade: PropTypes.func.isRequired,
  onDeleteCheckedRows: PropTypes.func.isRequired,
  checkedRows: PropTypes.objectOf(PropTypes.bool).isRequired,
  setCheckedRows: PropTypes.func.isRequired,
  isCommitted: PropTypes.bool.isRequired,
};
