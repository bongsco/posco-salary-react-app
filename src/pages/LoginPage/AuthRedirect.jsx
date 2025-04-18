import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '#contexts/useAuth';

export default function AuthRedirect() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    if (auth) {
      if (auth.groups.includes('bongsco_manager')) {
        navigate('/', { replace: true });
      } else {
        setIsUnauthorized(true);
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [auth, navigate]);

  if (auth && isUnauthorized) {
    return <p style={{ padding: '2rem' }}>⚠️ 접근 권한이 없습니다.</p>;
  }

  return null;
}
