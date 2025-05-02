import PropTypes from 'prop-types';
import BreadCrumbs from '#components/BreadCrumbs';
import Button from '#components/Button';
import styles from './AppLayout.module.css';

export default function AppLayout({ title, children, breadCrumbs }) {
  return (
    <>
      <BreadCrumbs items={breadCrumbs} />
      <div className={styles['header-container']}>
        <h1>{title}</h1>
        <div>
          {title === '메인' && (
            <Button
              label="Dataiku 바로가기"
              onClick={() => {
                window.open(
                  'https://dss-d6ce03f7-5df236e4-dku.ap-northeast-1.app.dataiku.io/workspaces/BONGSCO',
                  '_blank',
                );
              }}
              size="custom"
              customSize={{ width: '150px', height: '40px' }}
              variant="secondary"
            />
          )}
        </div>
      </div>
      {children}
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
