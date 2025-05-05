import PropTypes from 'prop-types';
import styles from './check-box.module.css';

export default function CheckBox({ isChecked = false, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}
      onClick={onClick}
      aria-label="checkBox"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
    />
  );
}

CheckBox.propTypes = {
  isChecked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  isChecked: false,
};
