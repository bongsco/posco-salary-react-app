import PropTypes from 'prop-types';
import inputStyles from '#styles/input.module.css';
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
    <div
      className={`${inputStyles.container} ${error ? inputStyles.error : inputStyles.default}`}
    >
      <button
        type="button"
        className={`${inputStyles.input} ${styles.dropdown}`}
        onClick={onClick}
        style={{ width: customWidth }}
      >
        <div className={styles.selectedValue}>
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
      {message && <div className={inputStyles.message}>{message}</div>}
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
