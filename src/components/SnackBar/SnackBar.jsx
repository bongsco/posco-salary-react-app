import PropTypes from 'prop-types';
import styles from './snackbar.module.css';

export default function SnackBar({ message }) {
  return (
    <div className={`${styles.snackbar}`}>
      <span>{message}</span>
    </div>
  );
}

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
};
