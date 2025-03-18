import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ isActive, isSaved, onChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isActive) {
      setDate(d);
      onChange(d);
    }
  };

  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick={!isActive}
      selected={date}
      onChange={(d) => !isActive && handleDateChange(d)}
      dateFormat="yyyy-MM-dd"
      disabled={isActive}
      className={`${styles.input} ${isSaved ? styles.saved : styles.unsaved}`}
    />
  );
}

CustomDatePicker.propTypes = {
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomDatePicker.defaultProps = {
  isActive: false,
  isSaved: false,
  onChange: () => {},
};

export default CustomDatePicker;
