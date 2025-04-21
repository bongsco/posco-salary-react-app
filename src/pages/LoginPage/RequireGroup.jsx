import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '#contexts/AuthContext';

export default function RequireGroup({ allowedGroups = [], children }) {
  const { auth, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const publicPaths = ['/login', '/logout'];
  const isPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (!isLoading && !auth && !isPublicPath) {
      navigate('/login');
    }
  }, [auth, isLoading, navigate, isPublicPath]);

  // ✅ 아직 로딩 중이면 렌더링 보류
  if (isLoading) return null;

  // 아직 인증 정보가 없고 public 경로도 아님 → 일단 렌더링하지 않음
  if (!auth && !isPublicPath) return null;

  // public path는 권한 검사 없이 통과
  if (isPublicPath) return children;

  // 권한 검사
  const userGroups = auth.groups;
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
