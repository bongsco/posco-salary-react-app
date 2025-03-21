import PropTypes from 'prop-types';
import styles from './step.module.css';
import CheckBadgeIcon from './badge-check.svg';

/**
 * @param {{
 *   title: string;
 *   isComplete: boolean;
 *   detailSteps: {
 *     id: number;
 *     text: string;
 *     isDone: boolean;
 *     date?: string;
 *   }[]
 * }} props
 */
export default function Step({ title, isComplete, detailSteps }) {
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
        {detailSteps.map((detailStep) => (
          <DetailStep
            key={detailStep.id}
            text={detailStep.text}
            state={detailStep.isDone}
            date={detailStep.date}
          />
        ))}
      </ul>
    </div>
  );
}

Step.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  detailSteps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      state: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }),
  ).isRequired,
};

// TODO: Track location to check working step
function DetailStep({ text, state, date = null }) {
  return (
    <li className={`${styles.item} ${styles[state ? 'complete' : 'undone']}`}>
      <div className={styles.bullet} />
      <div className={`${styles.itemContent} ${date ? styles.noDate : ''}`}>
        <div className={styles.itemText}>{text}</div>
        {date && <span className={styles.date}>{date}</span>}
      </div>
    </li>
  );
}

DetailStep.defaultProps = {
  date: null,
};

DetailStep.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['complete', 'working', 'undone']).isRequired,
  date: PropTypes.string,
};
