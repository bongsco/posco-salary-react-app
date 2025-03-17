import PropTypes from 'prop-types';
import styles from './check-box.module.css';

export default function CheckBox({ checked, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
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
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  checked: false,
};
