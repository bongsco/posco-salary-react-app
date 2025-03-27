import { useState } from 'react';
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
}) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isDisabled) {
      setDate(d);
      onChange(d);
    }
  };

  return (
    <div
      className={`${inputStyles.container} ${hasError ? inputStyles.error : ''} ${isSaved && !hasError ? inputStyles.default : ''} ${!isSaved && !hasError ? inputStyles.ok : ''}`}
      style={{ width: customWidth }}
    >
      <DatePicker
        showIcon
        toggleCalendarOnIconClick={!isDisabled}
        selected={date}
        onChange={(d) => !isDisabled && handleDateChange(d)}
        dateFormat="yyyy-MM-dd"
        disabled={isDisabled}
        readOnly={isDisabled}
        customInput={
          <input
            className={inputStyles.input}
            placeholder="yyyy-MM-dd"
            style={{ width: customWidth }}
          />
        }
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
};

CustomDatePicker.defaultProps = {
  message: null,
  customWidth: null,
};

export default CustomDatePicker;
