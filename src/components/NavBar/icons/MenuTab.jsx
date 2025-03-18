import styles from '../navbar.module.css';

export default function MenuTab() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 29 20"
      fill="none"
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
