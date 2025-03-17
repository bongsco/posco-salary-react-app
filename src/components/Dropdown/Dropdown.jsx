import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  currentValue,
  onChanged,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(currentValue);

  useEffect(() => {
    setSelectedValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (!options.includes(selectedValue)) {
      onChanged(null);
    }
  }, [selectedValue, options, onChanged]);

  // 드롭다운 메뉴 열기/닫기
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // 사용자가 선택한 값을 SelectValue로 설정
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChanged(option);
  };

  return (
    <div className={`${styles['dropdown-area']} ${error ? styles.error : ''}`}>
      <div className={styles.dropdown}>
        <div
          className={`${styles['select-selected']} ${
            options.includes(selectedValue) ? styles['selected-option'] : ''
          }`}
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              toggleDropdown();
            }
          }}
        >
          {options.includes(selectedValue) ? selectedValue : placeHolder}
        </div>
      </div>
      {!isOpen && message && <div className={styles.message}>{message}</div>}
      {isOpen && (
        <div className={styles['select-items-list']}>
          {options.map((option) => (
            <div
              className={styles['select-item']}
              key={option}
              role="button"
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleOptionClick(option);
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf().isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  onChanged: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  message: '',
};
