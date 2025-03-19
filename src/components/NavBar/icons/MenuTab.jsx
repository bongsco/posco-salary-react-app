import PropTypes from 'prop-types';
import styles from '../navbar.module.css';

export default function MenuTab({ onClick }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 29 20"
      fill="none"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5H28M1 10H28M1 18.5H28"
        stroke="#404040"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

MenuTab.propTypes = {
  onClick: PropTypes.func, // ✅ 클릭 핸들러 Prop 추가
};

MenuTab.defaultProps = {
  onClick: () => {}, // ✅ 기본 빈 함수 추가
};
