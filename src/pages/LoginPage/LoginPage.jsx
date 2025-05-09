import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '#components/Button';
import Input from '#components/Input';
import { useAuth } from '#contexts/AuthContext';
import styles from './login-page.module.css';

const config = { region: 'ap-northeast-2' };
const cognitoClient = new CognitoIdentityProviderClient(config);
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;

const errorMap = {
  UserNotFoundException: '해당 이메일의 사용자가 존재하지 않습니다.',
  NotAuthorizedException: '비밀번호가 올바르지 않습니다.',
  PasswordResetRequiredException: '비밀번호 재설정이 필요합니다.',
  UserNotConfirmedException: '이메일 인증이 완료되지 않았습니다.',
  UnknownError: '알 수 없는 오류가 발생했습니다.',
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const handleLogin = async () => {
    setErrorMessage('');

    const input = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
      ClientId: clientId,
    };

    try {
      const command = new InitiateAuthCommand(input);
      const response = await cognitoClient.send(command);

      if (response?.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        setErrorMessage('해당 계정은 새 비밀번호 설정이 필요합니다.');
        return;
      }

      const authResult = response?.AuthenticationResult;

      if (!authResult?.AccessToken || !authResult?.RefreshToken) {
        throw new Error('MissingToken');
      }

      // ✅ AuthContext에 저장
      setTokens({
        access: authResult.AccessToken,
        refresh: authResult.RefreshToken,
        id: authResult.IdToken,
      });

      // ✅ 로그인 성공 → 홈으로 이동
      navigate('/');
    } catch (error) {
      const name = error?.name || error?.message || 'UnknownError';
      setErrorMessage(
        errorMap[name] || '로그인에 실패했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>

      <div className={styles.loginBox}>
        <div className={styles.inputGroup}>
          <span className={styles.label}>Email</span>
          <Input
            id="email"
            value={email}
            customWidth="225px"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.label}>PW</span>
          <div className={styles.inputWrapper}>
            <Input
              id="password"
              type="password"
              value={password}
              customWidth="225px"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.passwordMask}>
              {'*'.repeat(password.length)}
            </div>
          </div>
        </div>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <Button
        label="로그인"
        size="custom"
        customSize={{ width: '47px', height: '27px' }}
        onClick={handleLogin}
        className={styles.loginButton}
      />
    </div>
  );
}

export default LoginPage;
