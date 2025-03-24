import PropTypes from 'prop-types';
import styles from './dropdown.module.css';

export default function Dropdown({
  options,
  error,
  message,
  placeHolder,
  selectedValue,
  isOpen,
  onChange,
  onClick,
}) {
  return (
    <div className={`${styles['dropdown-area']} ${error ? styles.error : ''}`}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={`${styles['select-selected']} ${selectedValue === null ? '' : styles['selected-option']}`}
          onClick={onClick}
        >
          {selectedValue === null ? placeHolder : selectedValue}
        </button>
      </div>
      {!isOpen && message && <div className={styles.message}>{message}</div>}
      {isOpen && (
        <div className={styles['select-items-list']}>
          {options.map((option) => (
            <button
              type="button"
              className={styles['select-item']}
              key={option}
              onClick={() => onChange(option)}
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
  selectedValue: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  message: '',
};
