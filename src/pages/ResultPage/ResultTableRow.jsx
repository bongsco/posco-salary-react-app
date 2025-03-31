import PropTypes from 'prop-types';
import styles from './result-page.module.css';

function ResultTableRow({ item }) {
  return (
    <tr>
      <td className={styles['table-medium-cell']}>{item.empNum}</td>
      <td className={styles['table-small-cell']}>{item.name}</td>
      <td className={styles['table-small-cell']}>{item.grade}</td>
      <td className={styles['table-small-cell']}>{item.position}</td>
      <td className={styles['table-large-cell']}>{item.departmentName}</td>
      <td className={styles['table-small-cell']}>{item.rank}</td>
      <td className={styles['table-small-cell']}>
        {item.salaryIncrementRate}%
      </td>
      <td className={styles['table-small-cell']}>
        {item.bonusIncretmentRate}%
      </td>
      <td className={styles['table-small-cell']}>
        {item.stdSalaryIncrementRate}%
      </td>
      <td className={styles['table-medium-cell']}>{item.payband}</td>
      <td className={styles['table-large-cell']}>
        {item.salaryBefore.toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item.salaryAfter.toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item.totalSalaryBefore.toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item.totalSalaryAfter.toLocaleString()}
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
