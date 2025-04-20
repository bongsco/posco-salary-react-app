import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '#components/BreadCrumbs';
import HeaderBar from '#components/mobile/HeaderBar';
import { ErrorHandlerProvider } from '#contexts/ErrorHandlerContext';
import styles from './mobile-layout.module.css';

export default function MobileLayout({ path = [], children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.mobileApp}>
      <HeaderBar onBackwardButtonClick={() => navigate(-1)} />
      <ErrorHandlerProvider>
        <div className={styles.body}>
          <BreadCrumbs items={['개인 연봉 조회', ...path]} />
          <div className={styles.content}>{children}</div>
        </div>
      </ErrorHandlerProvider>
    </div>
  );
}

MobileLayout.defaultProps = {
  path: [],
};

MobileLayout.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};
