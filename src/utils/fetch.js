let authContextRef = null;
export function setAuthContextRef(context) {
  authContextRef = context;
}

export default async function fetchApi(url, options = {}) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL
      : '/api';

  const token = authContextRef?.accessToken;
  const refreshAccessToken = authContextRef?.refreshAccessToken;
  const logout = authContextRef?.logout;

  // 1차 요청
  let response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // 토큰 만료 → 갱신 시도
  if (response.status === 401 && refreshAccessToken) {
    try {
      const newAccessToken = await refreshAccessToken();

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
}
