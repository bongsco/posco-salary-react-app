import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({ value, isDisabled, isSaved, onChange }) {
  const handleDateChange = (d) => {
    if (!isDisabled) {
      onChange(d); // ✅ 부모 상태를 업데이트해야 날짜가 반영됨
    }
  };

  return (
    <DatePicker
      showIcon
      placeholderText="YYYY-MM-DD"
      toggleCalendarOnIconClick={!isDisabled}
      selected={value} // ✅ 부모에서 받은 값을 직접 사용
      onChange={(d) => !isDisabled && handleDateChange(d)}
      dateFormat="yyyy-MM-dd"
      disabled={isDisabled}
      className={`${styles.input} ${isSaved ? styles.saved : styles.unsaved}`}
    />
  );
}

CustomDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date), // ✅ 부모에서 내려받는 값
  isDisabled: PropTypes.bool,
  isSaved: PropTypes.bool,
  onChange: PropTypes.func.isRequired, // ✅ 반드시 필요한 prop
};

CustomDatePicker.defaultProps = {
  value: null, // ✅ 기본값 설정
  isDisabled: false,
  isSaved: false,
};

export default CustomDatePicker;
