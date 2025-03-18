import PropTypes from 'prop-types';
import styles from './bread-crumbs.module.css';
import Chevron from './icons/Chevron';

export default function BreadCrumbs({ items }) {
  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbList}>
        {items.map((label, index) => (
          <li key={label} className={styles.breadcrumbItem}>
            <span
              className={`${styles.name} ${
                index === items.length - 1 ? styles.active : ''
              }`}
            >
              {label}
            </span>
            {index < items.length - 1 && (
              <Chevron className={styles.chevronRight} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string), // ✅ `string[]` 형태로 변경
};

BreadCrumbs.defaultProps = {
  items: [],
};
