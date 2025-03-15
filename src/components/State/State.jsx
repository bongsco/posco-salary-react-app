import React from 'react';
import PropTypes from 'prop-types';
import styles from './state.module.css';

const statusMap = {
  complete: { text: '완료', className: 'complete' },
  working: { text: '작업중', className: 'working' },
  warning: { text: '조치 필요', className: 'warning' },
};

export default function State({ status }) {
  const { text: labelText, className: labelClass } = statusMap[status];

  return (
    <div className={`${styles['state-label']} ${styles[labelClass]}`}>
      {labelText}
    </div>
  );
}

State.propTypes = {
  status: PropTypes.oneOf(['complete', 'working', 'warning']),
};

State.defaultProps = {
  status: 'warning',
};
