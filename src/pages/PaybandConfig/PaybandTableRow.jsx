import PropTypes, { string } from 'prop-types';

import styles from './payband-config-page.module.css';
import Input from '#components/Input/Input';
import CustomSlider from '#components/Slider/CustomSlider';

export default function PaybandTableRow({ item, onChange }) {
  return (
    <tr>
      <td className={`${styles.grade_cell}`}>{item.grade}</td>
      <td
        className={`${item.modified.lowerBound ? styles.modified_cell : ''} ${styles.limit_cell}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.lowerBound}
            mode={item.error.lowerBound ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                onChange(value, item.upperBound);
              } else {
                onChange(Number(newValue.target.value), item.upperBound);
              }
            }}
            customWidth="100%"
            minWidth="50px"
          />
        </div>
      </td>
      <td
        className={`${item.modified.upperBound ? styles.modified_cell : ''} ${styles.limit_cell}`}
      >
        <div className={`${styles.table_cell}`}>
          <Input
            value={item.upperBound}
            mode={item.error.upperBound ? 'error' : 'default'}
            onChange={(newValue) => {
              const { value } = newValue.target;
              if (value.trim() === '' || Number.isNaN(Number(value))) {
                onChange(item.lowerBound, value);
              } else {
                onChange(item.lowerBound, Number(newValue.target.value));
              }
            }}
            customWidth="100%"
            minWidth="50px"
          />
        </div>
      </td>
      <td>
        <CustomSlider
          min={item.lowerBound}
          max={item.upperBound}
          minLowerBound={0}
          maxUpperBound={200}
          step={10}
          onChange={(min, max) => {
            onChange(min, max);
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
  onChange: PropTypes.func.isRequired,
};
