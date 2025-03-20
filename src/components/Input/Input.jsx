import PropTypes from 'prop-types';
import styles from './input.module.css';

function Input({
  id,
  mode = 'default',
  placeholder = '',
  label,
  value,
  customWidth,
  customHeight,
  onFocus,
  onBlur,
  onChange,
}) {
  return (
    <div
      className={styles['input-box-container']}
      style={{ width: customWidth, height: customHeight }}
    >
      <input
        id={id}
        type="text"
        value={value}
        className={`${styles['input-box']} ${styles[mode]}`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: customWidth, height: customHeight }}
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
  customWidth: '225px',
  customHeight: '30px',
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
  customWidth: PropTypes.string,
  customHeight: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default Input;
