import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const region = 'ap-northeast-2';
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const cognitoClient = new CognitoIdentityProviderClient({ region });

// 👇 외부에서 주입된 context (LoginPage에서 넣어줌)
let authContextRef = null;
export function setAuthContextRef(context) {
  authContextRef = context;
}

// ✅ fetchApi 본체
export default async function fetchApi(url, options = {}) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL
      : '/api';

  const token = authContextRef?.accessToken;
  const refreshToken = authContextRef?.refreshToken;
  const setTokens = authContextRef?.setTokens;
  const logout = authContextRef?.logout;

  // 1차 요청
  let response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // 401 → 토큰 만료 → refresh 시도
  if (response.status === 401 && refreshToken) {
    try {
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

      // 토큰 갱신 후 저장
      setTokens({ access: newAccessToken, refresh: refreshToken });

      // 재시도
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
