import PropTypes from 'prop-types';
import { useState } from 'react';
import Input from '#components/Input';
import CheckBox from '#components/CheckBox';
import Dropdown from '#components/Dropdown';
import styles from './compensation-page.module.css';

export default function CompensationTableRow({
  grade,
  ranks,
  originalRanks,
  checked,
  onCheck,
  onChange,
  valueKey,
}) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isNewRow = grade.startsWith('NEW');

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelect = (value) => {
    setSelectedGrade(value);
    setIsDropdownOpen(false);
  };

  return (
    <tr>
      <td>
        <div className={styles.table_cell}>
          <CheckBox isChecked={checked} onClick={onCheck} />
        </div>
      </td>
      <td className={isNewRow ? styles.changedCell : ''}>
        <div className={styles.table_cell}>
          {isNewRow ? (
            <Dropdown
              placeHolder="선택"
              customWidth="100%"
              options={['P1', 'P2', 'P3', 'P4', 'P5', 'P6']}
              selectedValue={selectedGrade}
              isOpen={isDropdownOpen}
              onClick={handleDropdownToggle}
              onChange={handleDropdownSelect}
              error={!selectedGrade}
            />
          ) : (
            grade
          )}
        </div>
      </td>
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
        value1: PropTypes.number.isRequired,
        value2: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  originalRanks: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.number.isRequired,
        value2: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['value1', 'value2']).isRequired,
  // hasTypeError: PropTypes.bool.isRequired,
  // setHasTypeError: PropTypes.func.isRequired,
};
