import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '#styles/datepicker.css'; // CSS Modules import
import '#styles/input.css';

function CustomDatePicker({
  isDisabled,
  isSaved,
  onChange,
  hasError,
  customWidth = null,
  message = null,
}) {
  const inputRef = createRef();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (d) => {
    if (!isDisabled) {
      setDate(d);
      onChange(d);
    }
  };

  return (
    <div
      className={`input-container ${hasError ? 'error' : ''} ${isSaved && !hasError ? 'default' : ''} ${!isSaved && !hasError ? 'ok' : ''}`}
    >
      <DatePicker
        showIcon
        toggleCalendarOnIconClick={!isDisabled}
        selected={date}
        onChange={(d) => !isDisabled && handleDateChange(d)}
        dateFormat="yyyy-MM-dd"
        disabled={isDisabled}
        readOnly={isDisabled}
        ref={inputRef}
        customInput={
          <input
            className="input"
            placeholder="yyyy-MM-dd"
            style={{ width: customWidth }}
          />
        }
      />
      {message && <div className="input-message">{message}</div>}
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
