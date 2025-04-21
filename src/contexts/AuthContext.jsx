import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const region = process.env.REACT_APP_COGNITO_REGION;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const cognitoClient = new CognitoIdentityProviderClient({ region });

function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    const binary = atob(payload);

    // binary → UTF-8 문자열로 디코딩
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);

    return JSON.parse(decoded);
  } catch (e) {
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
    localStorage.removeItem('idToken');
    setAccessToken(null);
    setRefreshToken(null);
    setAuth(null);
    navigate('/login');
  }, [navigate]);

  const setTokens = useCallback(({ access, refresh, id }) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);

    if (id) {
      localStorage.setItem('idToken', id);
      const decoded = decodeJWT(id);
      if (decoded) {
        setAuth({
          name: decoded.name || '',
          email: decoded.email || '',
          groups: decoded['cognito:groups'] || [],
        });
      }
    }
  }, []);

  useEffect(() => {
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');
    const storedIdToken = localStorage.getItem('idToken');

    if (storedAccess && storedRefresh && storedIdToken) {
      setTokens({
        access: storedAccess,
        refresh: storedRefresh,
        id: storedIdToken,
      });
    }
  }, [setTokens]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) throw new Error('NoRefreshToken');

    const input = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
      ClientId: clientId,
    };

    const command = new InitiateAuthCommand(input);
    const result = await cognitoClient.send(command);
    const newAccessToken = result?.AuthenticationResult?.AccessToken;

    if (!newAccessToken) throw new Error('NoAccessToken');

    setTokens({ access: newAccessToken, refresh: refreshToken });
    return newAccessToken;
  }, [refreshToken, setTokens]);

  const contextValue = useMemo(
    () => ({
      auth,
      accessToken,
      refreshToken,
      setTokens,
      logout,
      refreshAccessToken,
    }),
    [auth, accessToken, refreshToken, setTokens, logout, refreshAccessToken],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
