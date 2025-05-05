import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckBadgeIcon from './badge-check.svg';
import styles from './step.module.css';

/**
 * @param {{
 *   title: string;
 *   isComplete: boolean;
 *   detailSteps: {
 *     id: number;
 *     text: string;
 *     state: 'WORKING' | 'UNDONE' | 'DONE';
 *     date?: string;
 *     url: string;
 *   }[]
 * }} props
 */
export default function Step({ title, isComplete, detailSteps }) {
  return (
    <div className={styles.step}>
      <div
        className={`${styles.titleContainer} ${isComplete ? styles.complete : styles.incomplete}`}
      >
        {isComplete && (
          <img src={CheckBadgeIcon} alt="완료 아이콘" className={styles.icon} />
        )}
        <span className={styles.title}>{title}</span>
      </div>

      <ul className={styles.list}>
        {detailSteps.map(({ id, text, state, date, url }) => (
          <DetailStep
            key={id}
            text={text}
            state={state}
            date={date}
            url={url}
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
function DetailStep({ text, state, date = null, url }) {
  return (
    <li className={`${styles.item} ${styles[state]}`}>
      <div className={styles.bullet} />
      <Link
        className={`${styles.itemContent} ${date ? styles.noDate : ''}`}
        to={`../../../${url}`}
      >
        <div className={styles.itemText}>{text}</div>
        {date && <span className={styles.date}>{date}</span>}
      </Link>
    </li>
  );
}

DetailStep.defaultProps = {
  date: null,
};

DetailStep.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['DONE', 'WORKING', 'UNDONE']).isRequired,
  date: PropTypes.string,
};
