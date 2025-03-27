import PropTypes from 'prop-types';
import styles from './dropdown.module.css';
import InputFrame from '#components/InputFrame';

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
    <InputFrame
      state={error ? 'error' : 'default'}
      message={message}
      customWidth={customWidth}
    >
      <button type="button" className={styles.dropdown} onClick={onClick}>
        <div className={styles.dropdownText}>
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
    </InputFrame>
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
