import PropTypes from 'prop-types';
import inputStyles from '#styles/input.module.css';

function Input({
  id,
  mode = 'default',
  placeholder = '',
  label = null,
  value = '',
  customWidth = null,
  customHeight = null,
  onChange,
}) {
  return (
    <div
      className={`${inputStyles.container} ${inputStyles[mode]}`}
      style={{ width: customWidth, height: customHeight }}
    >
      <input
        id={id}
        type="text"
        value={value}
        className={inputStyles.input}
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: customWidth, height: customHeight }}
      />
      {label && <span className={inputStyles.message}>{label}</span>}
    </div>
  );
}

Input.defaultProps = {
  mode: 'default',
  label: null,
  value: null,
  customWidth: null,
  customHeight: null,
  placeholder: null,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['default', 'error', 'ok']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  customWidth: PropTypes.string,
  customHeight: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
