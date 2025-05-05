import PropTypes from 'prop-types';
import styles from './result-page.module.css';
import '#styles/global.css';
import '#styles/table.css';

function ResultTableRow({ item }) {
  return (
    <tr>
      <td className={styles['table-medium-cell']}>{item['직번']}</td>
      <td className={styles['table-small-cell']}>{item['성명']}</td>
      <td className={styles['table-small-cell']}>{item['직급']}</td>
      <td className={styles['table-small-cell']}>{item.position}</td>
      <td className={styles['table-large-cell']}>{item['부서']}</td>
      <td className={styles['table-small-cell']}>{item['평가']}</td>
      <td className={styles['table-small-cell']}>
        {item.salaryIncrementRate}%
      </td>
      <td className={styles['table-small-cell']}>{item.bonusRate}%</td>
      <td className={styles['table-small-cell']}>
        {item.stdSalaryIncrementRate}%
      </td>
      <td className={styles['table-medium-cell']}>{item.payband}</td>
      <td className={styles['table-large-cell']}>
        {item.salaryBefore.toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item['기준연봉'].toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item.totalSalaryBefore.toLocaleString()}
      </td>
      <td className={styles['table-large-cell']}>
        {item['계약연봉'].toLocaleString()}
      </td>
    </tr>
  );
}
ResultTableRow.propTypes = {
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

export default ResultTableRow;
