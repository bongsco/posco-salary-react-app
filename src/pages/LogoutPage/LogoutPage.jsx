import { useEffect } from 'react';
import { useAuth } from '#contexts/AuthContext';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
