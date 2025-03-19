import React from 'react';
import styles from './svg.module.css';

export default function HomeIconSvg() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.86686C1 6.22922 1.31208 5.63233 1.83472 5.27032L8 1L14.1653 5.27032C14.6879 5.63233 15 6.22922 15 6.86686V15.0606C15 16.1317 14.1354 17 13.069 17H2.93103C1.86455 17 1 16.1317 1 15.0606V6.86686Z"
        stroke="#011C30"
        strokeWidth="1.50926"
        strokeLinejoin="round"
      />
      <path
        d="M5.82759 11.6667C5.82759 11.1311 6.25986 10.697 6.7931 10.697H9.2069C9.74014 10.697 10.1724 11.1311 10.1724 11.6667V17H5.82759V11.6667Z"
        stroke="#011C30"
        strokeWidth="1.50926"
        strokeLinejoin="round"
      />
    </svg>
  );
}
