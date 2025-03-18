import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  currentIndex,
  onChanged,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (selectedIndex !== currentIndex) {
      onChanged(selectedIndex);
    }
  }, [selectedIndex, currentIndex, onChanged]);

  // 드롭다운 메뉴 열기/닫기
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 사용자가 선택한 값을 SelectIndex로 설정
  const handleOptionClick = (index) => {
    setSelectedIndex(index + 1);
    setIsOpen(false);
  };

  return (
    <div className={`${styles['dropdown-area']} ${error ? styles.error : ''}`}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={`${styles['select-selected']} ${selectedIndex !== 0 ? styles['selected-option'] : ''}`}
          onClick={toggleDropdown}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              toggleDropdown();
            }
          }}
        >
          {selectedIndex === 0 ? placeHolder : options[selectedIndex - 1]}
        </button>
      </div>
      {!isOpen && message && <div className={styles.message}>{message}</div>}
      {isOpen && (
        <div className={styles['select-items-list']}>
          {options.map((option, index) => (
            <button
              type="button"
              className={styles['select-item']}
              key={option}
              tabIndex={0}
              onClick={() => handleOptionClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleOptionClick(index);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onChanged: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  message: '',
};
