import PropTypes from 'prop-types';
import styles from './result-page.module.css';

function ResultTableRow({ item }) {
  return (
    <tr>
      <td>{item.empNum}</td>
      <td>{item.name}</td>
      <td>{item.grade}</td>
      <td>{item.position}</td>
      <td>{item.departmentName}</td>
      <td>{item.rank}</td>
      <td>{item.salaryIncrementRate}%</td>
      <td>{item.bonusIncretmentRate}%</td>
      <td>{item.stdSalaryIncrementRate}%</td>
      <td>{item.payband}</td>
      <td>
        <div className={styles['body-salary-detail']}>
          <div className={styles['salary-inner-value']}>
            {item.salaryBefore}
          </div>
          <div className={styles['salary-inner-value']}>{item.salaryAfter}</div>
          <div className={styles['salary-inner-value']}>
            {item.totalSalaryBefore}
          </div>
          <div className={styles['salary-inner-value']}>
            {item.totalSalaryAfter}
          </div>
        </div>
      </td>
    </tr>
  );
}
ResultTableRow.propTypes = {
  item: PropTypes.shape({
    empNum: PropTypes.string,
    name: PropTypes.string,
    grade: PropTypes.string,
    position: PropTypes.string,
    departmentName: PropTypes.string,
    rank: PropTypes.string,
    salaryIncrementRate: PropTypes.number,
    bonusIncretmentRate: PropTypes.number,
    stdSalaryIncrementRate: PropTypes.number,
    payband: PropTypes.string,
    salaryBefore: PropTypes.number,
    salaryAfter: PropTypes.number,
    totalSalaryBefore: PropTypes.number,
    totalSalaryAfter: PropTypes.number,
  }).isRequired,
};

export default ResultTableRow;
