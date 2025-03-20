import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({
  id,
  mode = 'default',
  placeholder = '',
  label,
  value,
  customSize,
  onFocus,
  onBlur,
  onChange,
}) {
  return (
    <div className={styles['input-box-container']} style={customSize}>
      <input
        id={id}
        type="text"
        value={value}
        className={`${styles['input-box']} ${styles[mode]}`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={customSize}
      />
      {label ? (
        <span
          className={`${styles['input-box-label']} ${styles[mode]} ${styles.visible}`}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

Input.defaultProps = {
  id: '',
  mode: 'default',
  label: '',
  value: '',
  customSize: null,
  placeholder: '',
  onFocus: null,
  onBlur: null,
};

Input.propTypes = {
  id: PropTypes.string,
  mode: PropTypes.oneOf(['default', 'error', 'ok']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  customSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default Input;
