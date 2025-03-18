import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ disabled, saved }) {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick={!disabled}
      selected={date}
      onChange={(d) => !disabled && setDate(d)}
      dateFormat="yyyy-MM-dd"
      disabled={disabled}
      className={`${styles.input} ${saved ? styles.saved : styles.unsaved}`}
    />
  );
}

CustomDatePicker.propTypes = {
  disabled: PropTypes.bool,
  saved: PropTypes.bool, // ✅ saved props 추가
};

CustomDatePicker.defaultProps = {
  disabled: false,
  saved: false, // ✅ 기본값 false
};

export default CustomDatePicker;
