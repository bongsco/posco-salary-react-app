import { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  initialIndex,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index) => {
    onClick(index + 1);
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
  initialIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  message: '',
};
