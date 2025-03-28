import PropTypes from 'prop-types';
import { useState } from 'react';
import Input from '#components/Input';
import CheckBox from '#components/CheckBox';
import Dropdown from '#components/Dropdown';
import styles from './compensation-page.module.css';

/**
 * CompensationTableRow
 *
 * - 보상 비율 테이블의 각 행(Row)을 렌더링
 * - NEW로 시작하는 행은 드롭다운이 표시되고, 기존 행은 직급명 텍스트 표시
 * - 각 셀은 Input 컴포넌트로 구성되어 실시간 입력 가능
 */

export default function CompensationTableRow({
  grade, // 직급 키 (e.g. P3, P4, NEW1 등)
  ranks, // 평가 등급별 보상 데이터 (S~D 등급)
  originalRanks, // 커밋된 원본 데이터 (diff 체크용)
  checked, // 행 체크박스 여부
  onCheck, // 체크박스 클릭 핸들러
  onChange, // 셀 입력 변경 핸들러
  valueKey, // 'incrementRate' 또는 'provideRate' 지정
  selectedGrade, // NEW 행일 경우 선택된 드롭다운 값
  onSelectGrade, // 드롭다운 선택 시 호출되는 함수
  isCommitted,
}) {
  // 해당 행이 NEW로 추가된 행인지 여부
  const isNewRow = grade.startsWith('NEW');
  const shouldShowDropdown = isNewRow && !isCommitted;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelect = (value) => {
    onSelectGrade(grade, value);
    setIsDropdownOpen(false);
  };

  // 직급 표시 영역: 드롭다운 또는 텍스트
  let gradeContent;
  if (shouldShowDropdown) {
    gradeContent = (
      <Dropdown
        placeHolder="선택"
        customWidth="100%"
        options={['P1', 'P2', 'P3', 'P4', 'P5', 'P6']}
        selectedValue={selectedGrade || null}
        isOpen={isDropdownOpen}
        onClick={handleDropdownToggle}
        onChange={handleDropdownSelect}
        error={!selectedGrade}
      />
    );
  } else {
    gradeContent = selectedGrade || grade;
  }

  return (
    <tr>
      {/* 체크박스 영역 */}
      <td>
        <div className={styles.table_cell}>
          <CheckBox isChecked={checked} onClick={onCheck} />
        </div>
      </td>

      {/* 직급 셀 (드롭다운 or 텍스트) */}
      <td className={isNewRow ? styles.changedCell : ''}>
        <div className={styles.table_cell}>{gradeContent}</div>
      </td>

      {/* 평가등급별 셀 렌더링 */}
      {Object.entries(ranks).map(([rank, values]) => {
        const currentValue = values[valueKey];
        const originalValue = originalRanks?.[rank]?.[valueKey] ?? '';
        const isChanged = currentValue !== originalValue;

        const isTypeDifferent =
          typeof currentValue === 'string' || currentValue === '';

        return (
          <td
            key={`${grade}-${rank}`}
            className={
              isNewRow || isChanged ? styles.changedCell : styles.inputCell
            }
          >
            <div className={styles.table_cell}>
              <Input
                value={currentValue}
                mode={isTypeDifferent ? 'error' : 'default'}
                onChange={(e) => onChange(grade, rank, valueKey, e)}
                customWidth="100%"
                customHeight="100%"
              />
            </div>
          </td>
        );
      })}
    </tr>
  );
}

CompensationTableRow.propTypes = {
  grade: PropTypes.string.isRequired,
  ranks: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  originalRanks: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        incrementRate: PropTypes.number.isRequired,
        provideRate: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['incrementRate', 'provideRate']).isRequired,
  selectedGrade: PropTypes.string,
  onSelectGrade: PropTypes.func.isRequired,
  isCommitted: PropTypes.bool.isRequired,
};

CompensationTableRow.defaultProps = {
  selectedGrade: '',
};
