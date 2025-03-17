import PropTypes from 'prop-types';
import styles from './switch.module.css';

export default function Switch({ currentOn, onChanged }) {
  const toggleHandler = () => {
    onChanged(!currentOn);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-label="Toggle Switch Container"
      aria-checked={currentOn}
      tabIndex="0"
      onClick={toggleHandler}
      className={styles['toggle-switch']}
    >
      <div
        className={`${styles['toggle-container']} ${currentOn ? styles['toggle-checked'] : ''}`}
      />
      <div
        className={`${styles['toggle-circle']} ${currentOn ? styles['toggle-checked'] : ''}`}
      />
    </button>
  );
}

Switch.propTypes = {
  currentOn: PropTypes.bool.isRequired,
  onChanged: PropTypes.func.isRequired,
};
