import PropTypes from 'prop-types';

function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function RequireGroup({ allowedGroups = [], children }) {
  const token = localStorage.getItem('accessToken');
  const decoded = token ? decodeJWT(token) : null;
  const groups = decoded?.['cognito:groups'] || [];

  const hasPermission = groups.some((group) => allowedGroups.includes(group));

  if (!hasPermission) {
    return <p style={{ padding: '2rem' }}>⚠️ 접근 권한이 없습니다.</p>;
  }

  return children;
}

RequireGroup.propTypes = {
  allowedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
