import PropTypes, { string } from 'prop-types';
import CheckBox from '#components/CheckBox/CheckBox';
import Dropdown from '#components/Dropdown';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

import Input from '#components/Input/Input';
import CustomSlider from '#components/Slider/CustomSlider';

export default function PaybandTableRow({ item, originItem, onChange }) {
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
    if (addModified !== undefined && !item.modified.includes('전체')) {
      if (!item.modified.includes(addModified)) {
        updatedModified = [...item.modified, addModified];
      } else if (addModified === '하한' && lower === originItem.lowerBound) {
        updatedModified = item.modified.filter((m) => m !== addModified);
      } else if (addError === '상한' && upper === originItem.upperBound) {
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
          <CheckBox />
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
              onChange={(option) => selectGrade(option)}
            />
          </div>
        )}
      </td>
      <td
        className={`${item.modified.includes('전체') || item.modified.includes('하한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            initialValue={item.lowerBound}
            mode={item.error.includes('하한') ? 'error' : 'default'}
            onChange={(newValue) => {
              handleChange({
                lower: Number(newValue.target.value),
                addModified: '하한',
              });
            }}
          />
        </div>
      </td>
      <td
        className={`${item.modified.includes('전체') || item.modified.includes('상한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            initialValue={item.upperBound}
            mode={item.error.includes('상한') ? 'error' : 'default'}
            onChange={(newValue) => {
              handleChange({
                upper: Number(newValue.target.value),
                addModified: '상한',
              });
            }}
          />
        </div>
      </td>
      <td
        className={`${item.modified.includes('전체') ? styles.modified_cell : ''}`}
      >
        <CustomSlider
          initialMin={item.lowerBound}
          initialMax={item.upperBound}
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
  }).isRequired,
  originItem: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    modified: PropTypes.arrayOf(string).isRequired,
    error: PropTypes.arrayOf(string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
