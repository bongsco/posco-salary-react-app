import { Outlet, useNavigate } from 'react-router-dom';
import HeaderBar from '#components/mobile/HeaderBar';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import styles from './mobile-root-layout.module.css';

export default function MobileRootLayout() {
  const navigate = useNavigate();
  const { renderErrors } = useErrorHandlerContext();

  return (
    <div className={styles.mobileApp}>
      <HeaderBar onBackwardButtonClick={() => navigate(-1)} />
      <div className={styles.body}>
        {renderErrors()}
        <Outlet />
      </div>
    </div>
  );
}
