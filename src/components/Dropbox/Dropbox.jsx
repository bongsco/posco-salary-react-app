import React, { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import './Dropbox.css';

export default function Dropbox({ options, error, message }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Place Holder');

  // 드롭다운 메뉴 열기/닫기
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // 사용자가 선택한 값을 SelectValue로 설정
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className={`dropbox-area ${error ? 'error' : ''} `}>
      <div className="dropbox">
        <div
          className={`select-selected ${
            options.includes(selectedValue) ? 'selected-option' : ''
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
          {selectedValue}
        </div>
      </div>
      {!isOpen && message && <div className="message">{message}</div>}
      {isOpen && (
        <div className="select-items-list">
          {options.map((option) => (
            <div
              className="select-item"
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

// PropTypes 정의
Dropbox.propTypes = {
  options: PropTypes.arrayOf().isRequired, // options는 문자열 배열이어야 함
  error: PropTypes.bool.isRequired, // error는 boolean 값이어야 함
  message: PropTypes.string,
};

Dropbox.defaultProps = {
  message: '',
};
