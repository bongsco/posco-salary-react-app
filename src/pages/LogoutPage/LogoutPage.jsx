import { useEffect } from 'react';
import useAuth from '#contexts/useAuth';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
