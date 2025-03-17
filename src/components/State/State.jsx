import React from 'react';
import PropTypes from 'prop-types';
import styles from './state.module.css';

export default function State({ status, text }) {
  return (
    <div className={`${styles['state-label']} ${styles[status]}`}>{text}</div>
  );
}

State.propTypes = {
  status: PropTypes.oneOf(['complete', 'working', 'warning']),
  text: PropTypes.string.isRequired,
};

State.defaultProps = {
  status: 'warning',
};
