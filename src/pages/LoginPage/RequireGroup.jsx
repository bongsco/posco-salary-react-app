import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '#contexts/useAuth';

export default function RequireGroup({ allowedGroups = [], children }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // ✅ 로그인 안 된 경우 → 로그인 페이지로 이동
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  if (!auth) return null;

  const userGroups = auth?.groups || [];
  const hasPermission = userGroups.some((group) =>
    allowedGroups.includes(group),
  );

  if (!hasPermission) {
    return <p style={{ padding: '2rem' }}>⚠️ 접근 권한이 없습니다.</p>;
  }

  return children;
}

RequireGroup.propTypes = {
  allowedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
