import PropTypes from 'prop-types';
import styles from './labeled-switch.module.css';

export default function LabeledSwitch({ label, checked, committed, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${
        checked ? styles.checkedTrue : styles.checkedFalse
      } ${committed ? styles.committedTrue : styles.committedFalse}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

LabeledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  committed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
