import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  onChange,
  size,
}) {
  const uniqueOptions = new Set(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('Updated selectedValue:', selectedValue);
  }, [selectedValue]);

  const handleOptionClick = (option) => {
    /* 부모쪽으로 보내는 애 */
    onChange(option);
    console.log('야 부모 한테 보냇다.');
    /* selectedValue : 자식이 관리하는 변수 */
    setSelectedValue(() => option);
    console.log(option);
    console.log(selectedValue);
    console.log('야 여기 맞냐?');
    setIsOpen(false);
  };

  return (
    <div className={`${styles['dropdown-area']} ${error ? styles.error : ''}`}>
      <div className={`${styles.dropdown}`}>
        <button
          type="button"
          className={`${styles['select-selected']} ${styles[size]} ${selectedValue === null ? '' : styles['selected-option']}`}
          onClick={toggleDropdown}
        >
          {selectedValue === null ? placeHolder : selectedValue}
        </button>
      </div>
      {!isOpen && message && <div className={styles.message}>{message}</div>}
      {isOpen && (
        <div className={`${styles['select-items-list']} ${styles[size]}`}>
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
  size: PropTypes.oneOf(['small', 'large']),
};

Dropdown.defaultProps = {
  message: '',
  size: 'small',
};
