import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ isDisabled, isSaved, onChange, hasError }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isDisabled) {
      setDate(d);
      onChange(d); // ✅ 부모 상태를 업데이트해야 날짜가 반영됨
    }
  };

  const inputClass = [
    styles.input,
    isSaved ? styles.saved : styles.unsaved,
    hasError ? styles.error : '', // ✅ null일 때 에러 스타일 추가
  ].join(' ');

  return (
    <div>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick={!isDisabled}
        selected={date}
        onChange={(d) => !isDisabled && handleDateChange(d)}
        dateFormat="yyyy-MM-dd"
        disabled={isDisabled}
        className={inputClass}
      />
      {hasError && (
        <div className={styles.errorMessage}>날짜를 선택해주세요</div>
      )}
    </div>
  );
}

CustomDatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isSaved: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

CustomDatePicker.defaultProps = {
  isDisabled: false,
  isSaved: false,
  hasError: false,
  onChange: () => {},
};

export default CustomDatePicker;
