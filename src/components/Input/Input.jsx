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
  maxWidth = null,
  minWidth = null,
  maxHeight = null,
  minHeight = null,
  onChange,
}) {
  const customStyle = {
    width: customWidth,
    height: customHeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  };

  return (
    <div
      className={`${inputStyles.container} ${inputStyles[mode]}`}
      style={customStyle}
    >
      <input
        id={id}
        type="text"
        value={value}
        className={inputStyles.input}
        placeholder={placeholder}
        onChange={onChange}
        style={customStyle}
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
  maxWidth: null,
  minWidth: null,
  maxHeight: null,
  minHeight: null,
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
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string,
};

export default Input;
