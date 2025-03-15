import React from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import './State.css';

const statusMap = {
  complete: { text: '완료', className: 'state-label complete' },
  working: { text: '작업중', className: 'state-label working' },
  warning: { text: '조치 필요', className: 'state-label warning' },
};

export default function State({ status }) {
  const { text: labelText, className: labelClass } = statusMap[status];

  return <div className={labelClass}>{labelText}</div>;
}

State.propTypes = {
  status: PropTypes.oneOf(['complete', 'working', 'warning']),
};

State.defaultProps = {
  status: 'warning',
};
