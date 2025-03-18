import PropTypes from 'prop-types';
import styles from './bread-crumbs.module.css';
import Chevron from './icons/Chevron';

export default function BreadCrumbs({ items }) {
  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={item.label} className={styles.breadcrumbItem}>
            <span
              className={`${styles.name} ${
                index === items.length - 1 ? styles.active : ''
              }`}
            >
              {item.label}
            </span>
            {/* ✅ 마지막 아이템이 아니면 chevron-right 아이콘 추가 */}
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // ✅ `id` 제거하고 `label`만 필수값으로 설정
    }),
  ),
};

BreadCrumbs.defaultProps = {
  items: [],
};
