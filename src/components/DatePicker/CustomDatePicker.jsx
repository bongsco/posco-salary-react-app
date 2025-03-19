import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ isDisabled, isSaved, onChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isDisabled) {
      setDate(d);
      onChange(d);
    }
  };

  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick={!isDisabled}
      selected={date}
      onChange={(d) => !isDisabled && handleDateChange(d)}
      dateFormat="yyyy-MM-dd"
      disabled={isDisabled}
      className={`${styles.input} ${isSaved ? styles.saved : styles.unsaved}`}
    />
  );
}

CustomDatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isSaved: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomDatePicker.defaultProps = {
  isDisabled: false,
  isSaved: false,
  onChange: () => {},
};

export default CustomDatePicker;
