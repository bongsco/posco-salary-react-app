import PropTypes from 'prop-types';
import BreadCrumbs from '#components/BreadCrumbs';
import styles from './mobile-app-layout.module.css';

export default function MobileAppLayout({ path = [], children }) {
  return (
    <>
      <BreadCrumbs items={['개인 연봉 조회', ...path]} />
      <div className={styles.content}>{children}</div>
    </>
  );
}

MobileAppLayout.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

MobileAppLayout.defaultProps = {
  path: [],
};
