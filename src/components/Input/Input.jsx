import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({
  id,
  mode = 'default',
  placeholder = '',
  label,
  initialValue,
  customWidth,
  customHeight,
  onChange,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div
      className={styles['input-box-container']}
      style={{ width: customWidth, height: customHeight }}
    >
      <input
        id={id}
        type="text"
        value={value}
        className={`${styles['input-box']} ${styles[mode]}`}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        style={{ width: customWidth, height: customHeight }}
      />
      {label ? (
        <span
          className={`${styles['input-box-label']} ${styles[mode]} ${styles.visible}`}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

Input.defaultProps = {
  id: '',
  mode: 'default',
  label: '',
  initialValue: '',
  customWidth: 225,
  customHeight: 30,
  placeholder: '',
};

Input.propTypes = {
  id: PropTypes.string,
  mode: PropTypes.oneOf(['default', 'error', 'ok']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  customWidth: PropTypes.number,
  customHeight: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Input;
