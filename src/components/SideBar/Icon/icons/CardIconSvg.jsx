import React from 'react';
import styles from './svg.module.css';

export default function CardIcon() {
  return (
    <svg
      className={styles.icon}
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.2V11.92C1 13.0688 1.97683 14 3.18182 14H16.8182C18.0232 14 19 13.0688 19 11.92V6.2M1 6.2V3.08C1 1.93125 1.97683 1 3.18182 1H16.8182C18.0232 1 19 1.93125 19 3.08V6.2M1 6.2H19M4.27273 10.36H8.09091"
        stroke="#011C30"
        strokeWidth="1.20741"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
