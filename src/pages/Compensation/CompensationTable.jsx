import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/table.css';
import styles from './compensation-page.module.css';
import CheckBox from '#components/CheckBox';
import Input from '#components/Input';

export default function CompensationTable({
  currentData,
  originalData,
  onChange,
  valueKey,
}) {
  const [checkedRows, setCheckedRows] = useState({});
  let hasTypeError = false;

  const handleCheck = (grade) => {
    setCheckedRows((prev) => ({
      ...prev,
      [grade]: !prev[grade],
    }));
  };

  return (
    <>
      <table className={styles.table}>
        <col style={{ width: '4%' }} /> {/* 체크박스 열 */}
        <col style={{ width: '8%' }} /> {/* 직급 열 */}
        <col style={{ width: '12%' }} /> {/* 탁월 */}
        <col style={{ width: '12%' }} /> {/* 우수 */}
        <col style={{ width: '12%' }} /> {/* 충족 */}
        <col style={{ width: '12%' }} /> {/* 보완필요 */}
        <col style={{ width: '12%' }} /> {/* 미흡 */}
        <col style={{ width: '12%' }} /> {/* 매우미흡 */}
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
            <tr key={grade}>
              <td>
                <div className={styles.table_cell}>
                  <CheckBox
                    isChecked={!!checkedRows[grade]}
                    onClick={() => handleCheck(grade)}
                  />
                </div>
              </td>
              <td>{grade}</td>
              {Object.entries(ranks).map(([rank, values]) => {
                const currentValue = values[valueKey];
                const originalValue =
                  originalData?.[grade]?.[rank]?.[valueKey] ?? '';
                const isChanged = currentValue !== originalValue;

                const isNumberLike = (str) => /^[\d.]+%?$/.test(str.trim());

                const isTypeDifferent =
                  isNumberLike(currentValue) !== isNumberLike(originalValue);

                if (isTypeDifferent) hasTypeError = true;

                return (
                  <td
                    key={`${grade}-${rank}`}
                    className={
                      isChanged ? styles.changedCell : styles.inputCell
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
