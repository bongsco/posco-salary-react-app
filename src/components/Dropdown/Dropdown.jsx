import PropTypes from 'prop-types';
import '#styles/input.css';
import styles from './dropdown.module.css';

export default function Dropdown({
  error = false,
  message = null,
  selectedValue = null,
  customWidth = null,
  options,
  placeHolder,
  isOpen,
  onChange,
  onClick,
}) {
  return (
    <div className={`input-container ${error ? 'error' : 'default'}`}>
      <button
        type="button"
        className={`input ${styles.dropdown}`}
        onClick={onClick}
        style={{ width: customWidth }}
      >
        <div className="input-text">
          {selectedValue === null ? placeHolder : selectedValue}
        </div>
        <div className={styles.selectIcon} />
      </button>
      {isOpen && (
        <div className={styles.itemList}>
          {options.map((option) => (
            <button
              type="button"
              className={styles.item}
              key={option}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {message && <div className="input-message">{message}</div>}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  customWidth: PropTypes.string,
};

Dropdown.defaultProps = {
  error: false,
  message: null,
  customWidth: null,
};
