import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({
  label,
  isChecked,
  isCommitted,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${
        isChecked ? styles.checkedTrue : styles.checkedFalse
      } ${isCommitted ? styles.committedTrue : styles.committedFalse}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

LabeledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isCommitted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
