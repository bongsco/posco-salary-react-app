import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import inputStyles from '#styles/input.module.css';
import './datepicker.module.css';

function CustomDatePicker({
  isDisabled,
  isSaved,
  onChange,
  hasError,
  customWidth = null,
  message = null,
  maxWidth = null,
  minWidth = null,
}) {
  const [date, setDate] = useState(null);

  const handleDateChange = (d) => {
    if (!isDisabled) {
      setDate(d);
      onChange(d);
    }
  };

  const customStyle = {
    width: customWidth,
    minWidth,
    maxWidth,
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      onClick={onClick}
      ref={ref}
      value={value || 'YYYY-MM-DD'}
      readOnly
      className={inputStyles.input}
      style={{ color: value ? '#000' : '#aaa' }} // 값 없을 땐 흐리게 표시
    />
  ));
  CustomInput.displayName = 'CustomInput';
  CustomInput.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  return (
    <div
      className={`${inputStyles.container} ${hasError ? inputStyles.error : ''} ${isSaved && !hasError ? inputStyles.default : ''} ${!isSaved && !hasError ? inputStyles.ok : ''}`}
      style={customStyle}
    >
      <DatePicker
        showIcon
        toggleCalendarOnIconClick={!isDisabled}
        selected={date}
        onChange={(d) => !isDisabled && handleDateChange(d)}
        dateFormat="yyyy-MM-dd"
        disabled={isDisabled}
        customInput={<CustomInput />}
      />
      {message && <div className={inputStyles.message}>{message}</div>}
    </div>
  );
}

CustomDatePicker.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  message: PropTypes.string,
  customWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  message: null,
  customWidth: null,
  maxWidth: null,
  minWidth: null,
};

export default CustomDatePicker;
