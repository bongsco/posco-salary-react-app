import React from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import './State.css';

const statusMap = {
  완료: { text: '완료', className: 'state-label complete' },
  작업중: { text: '작업중', className: 'state-label working' },
  조치필요: { text: '조치 필요', className: 'state-label warning' },
};

export default function State({ status }) {
  const { text: labelText, className: labelClass } = statusMap[status];

  return <div className={labelClass}>{labelText}</div>;
}

State.propTypes = {
  status: PropTypes.oneOf(['완료', '작업중', '조치필요']),
};

State.defaultProps = {
  status: '조치필요',
};
