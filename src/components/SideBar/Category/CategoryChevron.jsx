import PropTypes from 'prop-types';
import styles from './chevron.module.css';

export default function CategoryChevron({ side }) {
  return (
    <svg
      className={`${styles.chevron} ${side === 'down' ? styles['upside-down'] : ''}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0147 14C9.69651 13.9999 9.39134 13.8772 9.16635 13.6589L4.36635 9.00174C4.25173 8.89434 4.16032 8.76586 4.09742 8.62382C4.03453 8.48177 4.00143 8.32899 4.00005 8.1744C3.99866 8.01981 4.02902 7.86649 4.08936 7.72341C4.1497 7.58032 4.2388 7.45033 4.35147 7.34101C4.46414 7.23169 4.59813 7.14524 4.7456 7.0867C4.89308 7.02816 5.05109 6.9987 5.21043 7.00004C5.36976 7.00139 5.52723 7.03351 5.67363 7.09452C5.82004 7.15554 5.95245 7.24424 6.06315 7.35544L10.0147 11.1894L13.9663 7.35544C14.1927 7.14336 14.4958 7.02601 14.8104 7.02866C15.1251 7.03131 15.426 7.15376 15.6485 7.36962C15.871 7.58549 15.9972 7.87751 16 8.18278C16.0027 8.48805 15.8817 8.78215 15.6631 9.00174L10.8631 13.6589C10.6382 13.8772 10.333 13.9999 10.0147 14Z"
        fill="#011C30"
      />
    </svg>
  );
}

CategoryChevron.propTypes = {
  side: PropTypes.oneOf(['up', 'down']).isRequired,
};
