import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datepicker.module.css'; // CSS Modules import

function CustomDatePicker({
  isDisabled,
  isSaved,
  onChange,
  hasError,
  eMessage,
  selectedDate,
}) {
  // const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isDisabled) {
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
        selected={selectedDate}
        onChange={(d) => !isDisabled && handleDateChange(d)}
        dateFormat="yyyy-MM-dd"
        disabled={isDisabled}
        className={inputClass}
        placeholderText="YYYY-MM-DD"
      />
      {hasError && <div className={styles.errorMessage}>{eMessage}</div>}
    </div>
  );
}

CustomDatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isSaved: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  eMessage: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

CustomDatePicker.defaultProps = {
  isDisabled: false,
  hasError: false,
  eMessage: '날짜를 입력해주세요',
};

export default CustomDatePicker;
