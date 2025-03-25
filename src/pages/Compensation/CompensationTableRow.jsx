import PropTypes from 'prop-types';
import Input from '#components/Input';
import CheckBox from '#components/CheckBox';
import styles from './compensation-page.module.css';

export default function CompensationTableRow({
  grade,
  ranks,
  originalRanks,
  checked,
  onCheck,
  onChange,
  valueKey,
  setHasTypeError,
}) {
  let rowHasTypeError = false;

  const isNumberLike = (str) => /^[\d.]+%?$/.test(str.trim());

  return (
    <tr>
      <td>
        <div className={styles.table_cell}>
          <CheckBox isChecked={checked} onClick={onCheck} />
        </div>
      </td>
      <td>{grade}</td>
      {Object.entries(ranks).map(([rank, values]) => {
        const currentValue = values[valueKey];
        const originalValue = originalRanks?.[rank]?.[valueKey] ?? '';
        const isChanged = currentValue !== originalValue;
        const isTypeDifferent =
          isNumberLike(currentValue) !== isNumberLike(originalValue);

        if (isTypeDifferent) rowHasTypeError = true;

        return (
          <td
            key={`${grade}-${rank}`}
            className={isChanged ? styles.changedCell : styles.inputCell}
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
      {rowHasTypeError && setHasTypeError(true)}
    </tr>
  );
}

CompensationTableRow.propTypes = {
  grade: PropTypes.string.isRequired,
  ranks: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.string.isRequired,
        value2: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  originalRanks: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.string.isRequired,
        value2: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['value1', 'value2']).isRequired,
  setHasTypeError: PropTypes.func.isRequired,
};
