import { useCallback } from 'react';
import { useAuth } from '#contexts/AuthContext';

export default function useFetchWithAuth() {
  const { accessToken, refreshToken, refreshAccessToken, logout } = useAuth();

  const fetchWithAuth = useCallback(
    async (url, options = {}) => {
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_API_URL
          : '/api';

      // 1차 요청
      let response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 401 → 토큰 만료 → 갱신 시도
      if (response.status === 401 && refreshToken && refreshAccessToken) {
        try {
          const newAccessToken = await refreshAccessToken();

          // 재요청
          response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
              ...(options.headers || {}),
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        } catch (err) {
          logout?.();
          throw new Error('Authentication expired');
        }
      }

      return response;
    },
    [accessToken, refreshToken, refreshAccessToken, logout],
  );

  return fetchWithAuth;
}
