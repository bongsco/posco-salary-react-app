import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setAuth(null);
    navigate('/login');
  }, [navigate]);

  // ✅ 토큰 초기화
  useEffect(() => {
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');

    if (storedAccess && storedRefresh) {
      const decoded = decodeJWT(storedAccess);
      if (decoded) {
        setAuth({
          name: decoded.name || '',
          email: decoded.email || '',
          groups: decoded['cognito:groups'] || [],
        });
        setAccessToken(storedAccess);
        setRefreshToken(storedRefresh);
      } else {
        logout();
      }
    }
  }, [logout]);

  const setTokens = useCallback(({ access, refresh }) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);

    const decoded = decodeJWT(access);
    if (decoded) {
      setAuth({
        name: decoded.name || '',
        email: decoded.email || '',
        groups: decoded['cognito:groups'] || [],
      });
    }
  }, []);

  const setUserInfo = useCallback((decoded) => {
    setAuth({
      name: decoded.name || '',
      email: decoded.email || '',
      groups: decoded['cognito:groups'] || [],
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      auth,
      accessToken,
      refreshToken,
      setTokens,
      setUserInfo,
      logout,
    }),
    [auth, accessToken, refreshToken, setTokens, setUserInfo, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
