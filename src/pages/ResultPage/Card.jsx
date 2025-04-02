import PropTypes from 'prop-types';
import styles from './result-page.module.css';

function Card({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles['card-row']}>
        <div className={styles['card-title']}>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            직번
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            성명
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            직급
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            직책
          </div>
        </div>
        <div className={styles['card-body']}>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item['직번']}
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item['성명']}
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item['직급']}
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item.position}
          </div>
        </div>
      </div>
      <div className={styles['card-row']}>
        <div className={styles['card-title']}>
          <div
            className={`${styles['card-2-detail-big']} ${styles['card-title-cell']}`}
          >
            부서
          </div>
          <div
            className={`${styles['card-2-detail-small']} ${styles['card-title-cell']}`}
          >
            평가
          </div>
        </div>
        <div className={styles['card-body']}>
          <div
            className={`${styles['card-2-detail-big']} ${styles['card-cell']}`}
          >
            {item['부서']}
          </div>
          <div
            className={`${styles['card-2-detail-small']} ${styles['card-cell']}`}
          >
            {item['평가']}
          </div>
        </div>
      </div>
      <div className={styles['card-row']}>
        <div className={styles['card-title']}>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            평차연봉인상률
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            성과금지급률
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            기준연봉인상률
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-title-cell']}`}
          >
            Payband
          </div>
        </div>
        <div className={styles['card-body']}>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item.salaryIncrementRate}%
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item.bonusRate}%
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item.stdSalaryIncrementRate}%
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']}`}>
            {item.payband}
          </div>
        </div>
      </div>
      <div className={styles['card-row']}>
        <div className={styles['card-total-title']}>
          <div
            className={`${styles['card-title-cell']} ${styles['card-title']}`}
          >
            연봉
          </div>
          <div className={styles['card-title']}>
            <div
              className={`${styles['card-title-2-detail']} ${styles['card-title-cell']}`}
            >
              기준연봉 조정전후
            </div>
            <div
              className={`${styles['card-title-2-detail']} ${styles['card-title-cell']} `}
            >
              계약연봉총액 조정전후
            </div>
          </div>
        </div>
        <div className={styles['card-body']}>
          <div
            className={`${styles['card-4-detail']} ${styles['card-cell']} ${styles.blur}`}
          >
            {item.salaryBefore.toLocaleString()}
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']} `}>
            {item['기준연봉'].toLocaleString()}
          </div>
          <div
            className={`${styles['card-4-detail']} ${styles['card-cell']} ${styles.blur}`}
          >
            {item.totalSalaryBefore.toLocaleString()}
          </div>
          <div className={`${styles['card-4-detail']} ${styles['card-cell']} `}>
            {item['계약연봉'].toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    직번: PropTypes.string,
    성명: PropTypes.string,
    직급: PropTypes.string,
    position: PropTypes.string,
    부서: PropTypes.string,
    평가: PropTypes.string,
    salaryIncrementRate: PropTypes.number,
    bonusRate: PropTypes.number,
    stdSalaryIncrementRate: PropTypes.number,
    payband: PropTypes.string,
    salaryBefore: PropTypes.number,
    기준연봉: PropTypes.number,
    totalSalaryBefore: PropTypes.number,
    계약연봉: PropTypes.number,
  }).isRequired,
};

export default Card;
