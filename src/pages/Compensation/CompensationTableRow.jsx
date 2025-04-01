import PropTypes from 'prop-types';
import Input from '#components/Input';
import styles from './compensation-page.module.css';

export default function CompensationTableRow({
  grade,
  ranks,
  originalRanks,
  onChange,
  valueKey,
}) {
  return (
    <tr>
      {/* 직급 셀 */}
      <td className={styles.inputCell}>
        <div className={styles.table_cell}>{grade}</div>
      </td>

      {/* 평가등급별 셀 렌더링 */}
      {Object.entries(ranks).map(([rank, values]) => {
        const currentValue = values?.[valueKey];
        const originalValue = originalRanks?.[rank]?.[valueKey];

        const isChanged = Number(currentValue) !== Number(originalValue);
        const isTypeDifferent =
          currentValue === '' ||
          currentValue === undefined ||
          Number.isNaN(Number(currentValue));

        return (
          <td
            key={`${grade}-${rank}-${valueKey}`} // key 확실히 유니크하게
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
    </tr>
  );
}

const RateShape = PropTypes.shape({
  incrementRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  provideRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
});

CompensationTableRow.propTypes = {
  grade: PropTypes.string.isRequired,
  ranks: PropTypes.objectOf(RateShape).isRequired,
  originalRanks: PropTypes.objectOf(RateShape).isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['incrementRate', 'provideRate']).isRequired,
};
