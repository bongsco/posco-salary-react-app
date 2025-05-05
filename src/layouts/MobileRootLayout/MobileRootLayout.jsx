import { Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from '#components/mobile/HeaderBar';
import { useAuth } from '#contexts/AuthContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import styles from './mobile-root-layout.module.css';

export default function MobileRootLayout() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { renderErrors } = useErrorHandlerContext();

  return (
    <div className={styles.mobileApp}>
      <HeaderBar onBackwardButtonClick={() => navigate(-1)} isSignedIn={auth} />
      <div className={styles.body}>
        {renderErrors()}
        <Outlet />
      </div>
    </div>
  );
}
