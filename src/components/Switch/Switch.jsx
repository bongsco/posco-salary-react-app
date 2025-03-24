import PropTypes from 'prop-types';
import styles from './switch.module.css';

export default function Switch({ isOn, onClick }) {
  return (
    <button
      type="button"
      role="switch"
      aria-label="Toggle Switch Container"
      aria-checked={isOn}
      tabIndex="0"
      onClick={onClick}
      className={styles['toggle-switch']}
    >
      <div
        className={`${styles['toggle-container']} ${isOn ? styles['toggle-checked'] : ''}`}
      />
      <div
        className={`${styles['toggle-circle']} ${isOn ? styles['toggle-checked'] : ''}`}
      />
    </button>
  );
}

Switch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
