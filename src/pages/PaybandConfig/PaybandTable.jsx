import { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import CheckBox from '#components/CheckBox/CheckBox';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

import Input from '#components/Input/Input';
import CustomSlider from '#components/Slider/CustomSlider';

export default function PaybandTable({ item, onChange }) {
  const [payband, setPayband] = useState(item);

  const handleChange = (updatedPayband) => {
    setPayband(({ id, grade }) => ({
      id,
      grade,
      upperBound: updatedPayband.upperBound,
      lowerBound: updatedPayband.lowerBound,
      modified: updatedPayband.modified,
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
        {payband.grade}
      </td>
      <td
        className={`${payband.modified.includes('전체') || payband.modified.includes('하한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            placeholder={payband.lowerBound}
            onChange={(newValue) => {
              const updatedPayband = {
                ...payband,
                lowerBound: Number(newValue),
                modified:
                  !payband.modified.includes('전체') &&
                  !payband.modified.includes('하한')
                    ? [...payband.modified, '하한']
                    : payband.modified,
              };
              handleChange(updatedPayband);
            }}
          />
        </div>
      </td>
      <td
        className={`${payband.modified.includes('전체') || payband.modified.includes('상한') ? styles.modified_cell : ''}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            placeholder={payband.upperBound}
            onChange={(newValue) => {
              const updatedPayband = {
                ...payband,
                upperBound: Number(newValue),
                modified:
                  !payband.modified.includes('전체') &&
                  !payband.modified.includes('상한')
                    ? [...payband.modified, '상한']
                    : payband.modified,
              };
              handleChange(updatedPayband);
            }}
          />
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
            const updatedModified = [...payband.modified];
            if (!payband.modified.includes('전체')) {
              if (min !== payband.lowerBound) {
                if (!payband.modified.includes('하한')) {
                  updatedModified.push('하한');
                }
              } else if (!payband.modified.includes('상한')) {
                updatedModified.push('상한');
              }
            }
            const updatedPayband = {
              ...payband,
              lowerBound: min,
              upperBound: max,
              modified: updatedModified,
            };

            handleChange(updatedPayband);
          }}
        />
      </td>
    </tr>
  );
}

PaybandTable.propTypes = {
  item: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    modified: PropTypes.arrayOf(string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
