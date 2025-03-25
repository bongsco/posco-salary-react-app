import { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import CheckBox from '#components/CheckBox/CheckBox';
import Dropdown from '#components/Dropdown';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

import Input from '#components/Input/Input';
import CustomSlider from '#components/Slider/CustomSlider';

export default function PaybandTableRow({
  item,
  originItem,
  onChange,
  onChecked,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChecked = () => {
    const updatedPayband = {
      ...item,
      isChecked: !item.isChecked,
    };
    onChecked(updatedPayband.isChecked, updatedPayband);
  };
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
  const hasError = (value) => {
    return (
      value === undefined || value < 0 || value > 200 || Number.isNaN(value)
    );
  };
  const handleChange = ({ lower, upper, addModified } = {}) => {
    let updatedModified = [];
    if (addModified !== undefined && !item.modified.includes('전체')) {
      if (!item.modified.includes(addModified)) {
        updatedModified = [...item.modified, addModified];
      } else if (addModified === '하한' && lower === originItem.lowerBound) {
        updatedModified = item.modified.filter((m) => m !== addModified);
      } else if (addModified === '상한' && upper === originItem.upperBound) {
        updatedModified = item.modified.filter((m) => m !== addModified);
      } else {
        updatedModified = item.modified;
      }
    } else {
      updatedModified = item.modified;
    }

    let updatedPayband = {
      ...item,
      lowerBound: lower !== undefined ? lower : item.lowerBound,
      upperBound: upper !== undefined ? upper : item.upperBound,
      modified: updatedModified,
    };

    if (addModified === '상한' && hasError(upper)) {
      updatedPayband = addError(addModified, updatedPayband);
    } else if (addModified === '하한' && hasError(lower)) {
      updatedPayband = addError(addModified, updatedPayband);
    } else if (updatedPayband.lowerBound > updatedPayband.upperBound) {
      updatedPayband = addError(addModified, updatedPayband);
    } else {
      updatedPayband = removeError(addModified, updatedPayband);
      // const opposite = addModified==="상한" ? "하한" : "상한"
      if (
        addModified === '상한' &&
        updatedPayband.error.includes('하한') &&
        !hasError(updatedPayband.lowerBound)
      ) {
        updatedPayband = removeError('하한', updatedPayband);
      } else if (
        addModified === '하한' &&
        updatedPayband.error.includes('하한') &&
        !hasError(updatedPayband.upperBound)
      ) {
        updatedPayband = removeError('상한', updatedPayband);
      }
    }
    onChange(updatedPayband);
  };

  const selectGrade = (option) => {
    const updatedPayband = {
      ...item,
      grade: option,
      error: item.error.filter((e) => e !== '직급'),
    };
    onChange(updatedPayband);
  };

  return (
    <tr>
      <td
        className={`${item.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => {
              handleChecked();
            }}
          />
        </div>
      </td>
      <td
        className={`${item.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        {!item.modified.includes('전체') ? (
          item.grade
        ) : (
          <div className={`${styles.table_cell}`}>
            <Dropdown
              options={[
                'A1',
                'A2',
                'A3',
                'D1',
                'D2',
                'D3',
                'E2',
                'E3',
                'E4',
                'E5',
                'E6',
                'G1',
                'G2',
                'G3',
                'O1',
                'O2',
                'O3',
                'P1',
                'P2',
                'P3',
                'P4',
                'P5',
                'P6',
                'P7',
                'R1',
                'R2',
                'R3',
              ]}
              error={item.error.includes('직급')}
              placeHolder="선택"
              onChange={(option) => {
                selectGrade(option);
                setIsOpen((prev) => !prev);
              }}
              selectedValue={item.grade !== undefined ? item.grade : null}
              isOpen={isOpen}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            />
          </div>
        )}
      </td>
      <td
        className={`${item.modified.includes('전체') || item.modified.includes('하한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.lowerBound}
            mode={item.error.includes('하한') ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                const updatedPayband = addError('하한', item);
                updatedPayband.lowerBound = value;
                onChange(updatedPayband);
              } else {
                handleChange({
                  lower: Number(newValue.target.value),
                  addModified: '하한',
                });
              }
            }}
          />
        </div>
      </td>
      <td
        className={`${item.modified.includes('전체') || item.modified.includes('상한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.upperBound}
            mode={item.error.includes('상한') ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                const updatedPayband = addError('상한', item);
                updatedPayband.upperBound = value;
                onChange(updatedPayband);
              } else {
                handleChange({
                  upper: Number(newValue.target.value),
                  addModified: '상한',
                });
              }
            }}
          />
        </div>
      </td>
      <td
        className={`${item.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        <CustomSlider
          min={item.lowerBound}
          max={item.upperBound}
          minLowerBound={0}
          maxUpperBound={200}
          step={10}
          onChange={(min, max) => {
            handleChange({
              lower: min,
              upper: max,
              addModified: min !== item.lowerBound ? '하한' : '상한',
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
    error: PropTypes.arrayOf(string).isRequired,
    isChecked: PropTypes.bool.isRequired,
  }).isRequired,
  originItem: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    modified: PropTypes.arrayOf(string).isRequired,
    error: PropTypes.arrayOf(string).isRequired,
    isChecked: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
};
