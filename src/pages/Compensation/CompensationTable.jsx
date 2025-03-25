import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/table.css';
import styles from './compensation-page.module.css';
import CheckBox from '#components/CheckBox';
import CompensationTableRow from './CompensationTableRow';

export default function CompensationTable({
  currentData,
  originalData,
  onChange,
  valueKey,
}) {
  const [checkedRows, setCheckedRows] = useState({});
  const [hasTypeError, setHasTypeError] = useState(false);

  const handleCheck = (grade) => {
    setCheckedRows((prev) => ({
      ...prev,
      [grade]: !prev[grade],
    }));
  };

  return (
    <>
      <table className={styles.table}>
        <col style={{ width: '4%' }} />
        <col style={{ width: '8%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '12%' }} />
        <thead>
          <tr>
            <td>
              <div className={styles.table_cell}>
                <CheckBox isChecked={false} onClick={() => {}} />
              </div>
            </td>
            <td>직급</td>
            <td>탁월(S)</td>
            <td>우수</td>
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
              setHasTypeError={setHasTypeError}
            />
          ))}
        </tbody>
      </table>
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
        value1: PropTypes.string.isRequired,
        value2: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  originalData: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        value1: PropTypes.string.isRequired,
        value2: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.oneOf(['value1', 'value2']).isRequired,
};
