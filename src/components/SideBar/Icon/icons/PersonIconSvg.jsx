import React from 'react';
import styles from './svg.module.css';

export default function PersonIconSvg() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.64 4.74242C11.64 6.80931 10.0103 8.48485 8 8.48485C5.98968 8.48485 4.36 6.80931 4.36 4.74242C4.36 2.67554 5.98968 1 8 1C10.0103 1 11.64 2.67554 11.64 4.74242Z"
        stroke="#011C30"
        strokeWidth="1.20741"
        strokeLinejoin="round"
      />
      <path
        d="M1 16.2576C1 13.1573 3.44453 10.6439 6.46 10.6439H9.54C12.5555 10.6439 15 13.1573 15 16.2576C15 17.291 14.1852 18.1288 13.18 18.1288H2.82C1.81484 18.1288 1 17.291 1 16.2576Z"
        stroke="#011C30"
        strokeWidth="1.20741"
        strokeLinejoin="round"
      />
    </svg>
  );
}
