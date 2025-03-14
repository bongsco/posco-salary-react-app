import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({ mode = 'primary', placeholder, label, onFocus, onBlur }) {
  const modeLabels = {
    error: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
    ok: '여기에 메시지를 입력해 주세요.',
    default: '여기에 입력 관련 메시지를 입력하세요.',
  };

  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles['input-box-container']}>
      <input
        ref={inputRef}
        type="text"
        className={`${styles['input-box']} ${styles[mode]} ${isFocused ? styles[mode].focus : ''}`}
        placeholder={placeholder}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
      />
      <span
        className={`${styles['input-box-label']} ${styles[mode]} ${isFocused ? styles.visible : ''}`}
      >
        {label || modeLabels[mode] || modeLabels.default}
      </span>
    </div>
  );
}

Input.defaultProps = {
  mode: 'primary',
  label: null,
  onFocus: undefined,
  onBlur: undefined,
};

Input.propTypes = {
  mode: PropTypes.oneOf(['primary', 'error', 'ok']),
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
