import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './header-bar.module.css';
import '#styles/global.css';

function BackwardButton({ onClick, className }) {
  return (
    <button type="button" onClick={onClick} className={className}>
      <svg
        width="10"
        height="17"
        viewBox="0 0 10 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.12 8.22L7.92 0.42L9.76 2.28L3.8 8.22L9.76 14.18L7.92 16.04L0.12 8.22Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

BackwardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default function HeaderBar({ onBackwardButtonClick, isSignedIn }) {
  return (
    <nav className={styles.container}>
      {isSignedIn ? (
        <Link to="/logout" className={styles.logout}>
          로그아웃
        </Link>
      ) : null}
      <div className={styles.spaceHolder} />
      <Link to="/personal" className={styles.title}>
        연봉관리시스템
      </Link>
      <BackwardButton
        onClick={onBackwardButtonClick}
        className={styles.button}
      />
    </nav>
  );
}

HeaderBar.propTypes = {
  onBackwardButtonClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};
