import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({
  label,
  isCommitted,
  isChecked,
  onClick,
}) {
  const handleClick = () => {
    onClick(label, !isChecked);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${
        isChecked ? styles.checkedTrue : styles.checkedFalse
      } ${isCommitted ? styles.committedTrue : styles.committedFalse}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

LabeledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  isCommitted: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired, // ✅ 변경됨
  onClick: PropTypes.func.isRequired,
};
