import PropTypes from 'prop-types';
import styles from './step.module.css';
import CheckBadgeIcon from './assets/badge-check.svg';

export default function Step({ title, isComplete, items }) {
  return (
    <div className={styles.step}>
      <div
        className={`${styles.titleContainer} ${isComplete ? styles.complete : ''}`}
      >
        {isComplete && (
          <img src={CheckBadgeIcon} alt="완료 아이콘" className={styles.icon} />
        )}
        <span className={styles.title}>{title}</span>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={`${styles.item} ${styles[item.state]}`}>
            <div className={styles.bullet} />
            <div
              className={`${styles.itemContent} ${item.state === 'undone' ? styles.noDate : ''}`}
            >
              <span className={styles.itemText}>{item.text}</span>
              {item.state !== 'undone' && item.date && (
                <span className={styles.date}>{item.date}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Step.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      state: PropTypes.oneOf(['complete', 'working', 'undone']).isRequired,
      date: PropTypes.string,
    }),
  ).isRequired,
};
