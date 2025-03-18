import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ isActive, isSaved, onChange }) {
  const [date, setDate] = useState(new Date());

  // ✅ 날짜 변경 핸들러
  const handleDateChange = (d) => {
    if (!isActive) {
      setDate(d);
      onChange(d); // ✅ 외부에서도 변경 감지 가능
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
  isSaved: PropTypes.bool, // ✅ saved props 추가
  onChange: PropTypes.func, // ✅ 외부에서 변경 감지할 수 있도록 Prop 추가
};

CustomDatePicker.defaultProps = {
  isActive: false,
  isSaved: false, // ✅ 기본값 false
  onChange: () => {},
};

export default CustomDatePicker;
