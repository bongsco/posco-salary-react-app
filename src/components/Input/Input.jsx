import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({ mode = 'primary', placeholder, label, onFocus, onBlur }) {
  const modeLabels = {
    error: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
    ok: '여기에 메시지를 입력해 주세요.',
    default: '여기에 입력 관련 메시지를 입력하세요.',
  };

  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (placeholder) {
      setValue(placeholder);
      setIsFocused(true);
    } else {
      setValue('');
    }
  }, [placeholder]);

  return (
    <div className={styles['input-box-container']}>
      <input
        type="text"
        value={value}
        className={`${styles['input-box']} ${styles[mode]} ${isFocused && mode === 'primary' ? styles.focused : ''}`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          if (!value) setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
      />
      {value && (
        <span
          className={`${styles['input-box-label']} ${styles[mode]} ${styles.visible}`}
        >
          {label || modeLabels[mode] || modeLabels.default}
        </span>
      )}
    </div>
  );
}

Input.defaultProps = {
  mode: 'primary',
  label: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
  onFocus: null,
  onBlur: null,
};

Input.propTypes = {
  mode: PropTypes.oneOf(['primary', 'error', 'ok']),
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
