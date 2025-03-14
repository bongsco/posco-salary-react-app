import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({
  mode = 'primary',
  fontWeight = 400,
  placeholder = '플레이스 홀더 PlaceHolder',
  label,
  onFocus,
  onBlur,
}) {
  const borderColors = {
    primary: '#C2E6FF',
    error: '#FF325F',
    ok: '#A1FD28',
  };

  const modeLabels = {
    error: '여기에 입력 오류와 관련된 메시지를 입력해 주세요.',
    ok: '여기에 메시지를 입력해 주세요.',
    default: '여기에 입력 관련 메시지를 입력하세요.',
  };

  const focusColor = '#40afff';
  const borderColor = borderColors[mode] || '#C2E6FF';

  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles['input-box-container']}>
      <input
        ref={inputRef}
        type="text"
        className={`${styles['input-box']} ${styles[mode]} ${isFocused ? styles.focused : ''}`}
        style={{
          borderColor:
            isFocused && mode === 'primary' ? focusColor : borderColor,
          boxShadow:
            isFocused && mode === 'primary' ? `0 0 2px ${focusColor}` : 'none',
          fontWeight,
        }}
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
        style={{
          color: isFocused && mode === 'primary' ? focusColor : borderColor,
          fontWeight,
          opacity: isFocused ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        {label || modeLabels[mode] || modeLabels.default}
      </span>
    </div>
  );
}

Input.defaultProps = {
  mode: 'primary',
  fontWeight: 400,
  placeholder: '플레이스 홀더 PlaceHolder',
  label: null,
  onFocus: undefined,
  onBlur: undefined,
};

Input.propTypes = {
  mode: PropTypes.oneOf(['primary', 'error', 'ok']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
