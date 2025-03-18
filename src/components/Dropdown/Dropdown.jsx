import { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  onChange,
}) {
  const uniqueOptions = new Set(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles['dropdown-area']} ${error ? styles.error : ''}`}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={`${styles['select-selected']} ${selectedValue === null ? '' : styles['selected-option']}`}
          onClick={toggleDropdown}
        >
          {selectedValue === null ? placeHolder : selectedValue}
        </button>
      </div>
      {!isOpen && message && <div className={styles.message}>{message}</div>}
      {isOpen && (
        <div className={styles['select-items-list']}>
          {Array.from(uniqueOptions).map((option) => (
            <button
              type="button"
              className={styles['select-item']}
              key={option}
              onClick={() => handleOptionClick(option)}
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
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  message: '',
};
