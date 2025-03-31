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
  isDeleted,
  onChange,
  remainingGrades,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr>
      <td
        className={`${item.isNewRow ? styles.modified_cell : ''} ${isDeleted ? styles.deleted_cell : ''} ${styles.check_cell}`}
      >
        <div className={`${styles.table_cell}`}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => {
              onChange(!item.isChecked, '체크');
            }}
          />
        </div>
      </td>
      <td
        className={`${item.isNewRow ? styles.modified_cell : ''} ${isDeleted ? styles.deleted_cell : ''} ${styles.grade_cell}`}
      >
        {!item.isNewRow ? (
          item.grade
        ) : (
          <div className={`${styles.table_cell}`}>
            <Dropdown
              options={remainingGrades}
              error={item.error.includes('직급')}
              placeHolder="선택"
              onChange={(option) => {
                onChange(option, '직급');
                setIsOpen((prev) => !prev);
              }}
              selectedValue={item.grade !== undefined ? item.grade : null}
              isOpen={isOpen}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              customWidth="100%"
              minWidth="50px"
            />
          </div>
        )}
      </td>
      <td
        className={`${item.isNewRow || item.modified.includes('하한') ? styles.modified_cell : ''} ${isDeleted ? styles.deleted_cell : ''} ${styles.limit_cell}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.lowerBound}
            mode={item.error.includes('하한') ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                onChange(value, '하한');
              } else {
                onChange(Number(newValue.target.value), '하한');
              }
            }}
            customWidth="100%"
            minWidth="50px"
          />
        </div>
      </td>
      <td
        className={`${item.isNewRow || item.modified.includes('상한') ? styles.modified_cell : ''} ${isDeleted ? styles.deleted_cell : ''} ${styles.limit_cell}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.upperBound}
            mode={item.error.includes('상한') ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                onChange(value, '상한');
              } else {
                onChange(Number(newValue.target.value), '상한');
              }
            }}
            customWidth="100%"
            minWidth="50px"
          />
        </div>
      </td>
      <td
        className={`${item.isNewRow ? styles.modified_cell : ''} ${isDeleted ? styles.deleted_cell : ''} `}
      >
        <CustomSlider
          min={item.lowerBound}
          max={item.upperBound}
          minLowerBound={0}
          maxUpperBound={200}
          step={10}
          onChange={(min, max) => {
            if (min !== item.lowerBound) {
              onChange(min, '하한');
            } else {
              onChange(max, '상한');
            }
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
    isNewRow: PropTypes.bool.isRequired,
  }).isRequired,
  isDeleted: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  remainingGrades: PropTypes.arrayOf(PropTypes.string).isRequired,
};
