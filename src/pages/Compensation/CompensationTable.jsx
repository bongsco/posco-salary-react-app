import PropTypes from 'prop-types';
import styles from './compensation-page.module.css';
import CompensationTableRow from './CompensationTableRow';

export default function CompensationTable({
  currentData,
  originalData,
  onChange,
  valueKey,
  hasError,
}) {
  return (
    <>
      <div className={styles.tableHeaderWrapper}>
        <div className={styles.unitText}>단위 (%)</div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
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
              onChange={onChange}
              valueKey={valueKey}
            />
          ))}
        </tbody>
      </table>

      {hasError && (
        <div className={styles.errorMessage}>
          표에서 빈 값이나 잘못된 값을 수정해 주세요.
        </div>
      )}
    </>
  );
}

// 수정된 PropTypes: string | number 허용 (입력 중 문자열일 수 있으므로)
const RateShape = PropTypes.shape({
  incrementRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  provideRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
});

CompensationTable.propTypes = {
  currentData: PropTypes.objectOf(PropTypes.objectOf(RateShape)).isRequired,
  originalData: PropTypes.objectOf(PropTypes.objectOf(RateShape)).isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['incrementRate', 'provideRate']).isRequired,
  hasError: PropTypes.bool.isRequired,
};
