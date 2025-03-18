import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({
  mode = 'default',
  placeholder = '',
  label,
  onFocus,
  onBlur,
  onChange,
}) {
  const [value, setValue] = useState('');

  return (
    <div className={styles['input-box-container']}>
      <input
        type="text"
        value={value}
        className={`${styles['input-box']} ${styles[mode]}`}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={(e) => {
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
        }}
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
  mode: 'default',
  label: '',
  placeholder: '',
  onFocus: null,
  onBlur: null,
};

Input.propTypes = {
  mode: PropTypes.oneOf(['default', 'error', 'ok']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default Input;
