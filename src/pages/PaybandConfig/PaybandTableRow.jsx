import { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import CheckBox from '#components/CheckBox/CheckBox';
import Button from '#components/Button/Button';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

import Input from '#components/Input/Input';
import CustomSlider from '#components/Slider/CustomSlider';

export default function PaybandTableRow({ item, originItem, onChange }) {
  const [payband, setPayband] = useState(item);
  useEffect(() => {
    setPayband(item);
  }, [item]);
  const addError = (addModified, updatedPayband) => {
    return {
      ...updatedPayband,
      error: updatedPayband.error.includes(addModified)
        ? updatedPayband.error
        : [...updatedPayband.error, addModified],
    };
  };
  const removeError = (addModified, updatedPayband) => {
    return {
      ...updatedPayband,
      error: updatedPayband.error.filter((e) => e !== addModified),
    };
  };
  const handleChange = ({ lower, upper, addModified } = {}) => {
    let updatedModified = [];
    if (addModified !== undefined && !payband.modified.includes('전체')) {
      if (!payband.modified.includes(addModified)) {
        updatedModified = [...payband.modified, addModified];
      } else if (addModified === '하한' && lower === originItem.lowerBound) {
        updatedModified = payband.modified.filter((m) => m !== addModified);
      } else if (addError === '상한' && upper === originItem.upperBound) {
        updatedModified = payband.modified.filter((m) => m !== addModified);
      }
    } else {
      updatedModified = payband.modified;
    }

    let updatedPayband = {
      ...payband,
      lowerBound: lower !== undefined ? lower : payband.lowerBound,
      upperBound: upper !== undefined ? upper : payband.upperBound,
      modified: updatedModified,
    };

    if (
      addModified === '상한' &&
      (upper === undefined || upper < 0 || upper > 200 || Number.isNaN(upper))
    ) {
      updatedPayband = addError(addModified, updatedPayband);
    } else if (
      addModified === '하한' &&
      (lower === undefined || lower < 0 || lower > 200 || Number.isNaN(lower))
    ) {
      updatedPayband = addError(addModified, updatedPayband);
    } else if (updatedPayband.lowerBound > updatedPayband.upperBound) {
      updatedPayband = addError(addModified, updatedPayband);
    } else {
      updatedPayband = removeError(addModified, updatedPayband);
    }
    setPayband(({ id, grade }) => ({
      id,
      grade,
      upperBound: updatedPayband.upperBound,
      lowerBound: updatedPayband.lowerBound,
      modified: updatedPayband.modified,
      error: updatedPayband.error,
    }));
    onChange(updatedPayband);
  };

  return (
    <tr>
      <td
        className={`${payband.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <CheckBox />
        </div>
      </td>
      <td
        className={`${payband.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        {payband.grade !== undefined ? (
          payband.grade
        ) : (
          <div className={`${styles.table_cell}`}>
            <Button
              variant="secondary"
              size="custom"
              label="선택"
              mode={payband.error.includes('버튼') ? 'error' : 'default'}
              customSize={{ width: '60px', height: '26px' }}
            />
          </div>
        )}
      </td>
      <td
        className={`${payband.modified.includes('전체') || payband.modified.includes('하한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            initialValue={payband.lowerBound}
            mode={payband.error.includes('하한') ? 'error' : 'default'}
            onChange={(newValue) => {
              handleChange({
                lower: Number(newValue.target.value),
                addModified: '하한',
              });
            }}
            customWidth={90}
          />
          <div>%</div>
        </div>
      </td>
      <td
        className={`${payband.modified.includes('전체') || payband.modified.includes('상한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            initialValue={payband.upperBound}
            mode={payband.error.includes('상한') ? 'error' : 'default'}
            onChange={(newValue) => {
              handleChange({
                upper: Number(newValue.target.value),
                addModified: '상한',
              });
            }}
            customWidth={90}
          />
          <div>%</div>
        </div>
      </td>
      <td
        className={`${payband.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        <CustomSlider
          initialMin={payband.lowerBound}
          initialMax={payband.upperBound}
          minLowerBound={0}
          maxUpperBound={200}
          step={10}
          onChange={(min, max) => {
            handleChange({
              lower: min,
              upper: max,
              addModified: min !== payband.lowerBound ? '하한' : '상한',
            });
          }}
        />
      </td>
    </tr>
  );
}

PaybandTableRow.propTypes = {
  item: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    modified: PropTypes.arrayOf(string).isRequired,
  }).isRequired,
  originItem: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    modified: PropTypes.arrayOf(string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
