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
                  'https://dss-66429905-e85a59eb-dku.ap-northeast-1.app.dataiku.io/webapps/TUT_LLM_QAWITHRAGAPPROACH/ZUcRRvh/',
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
