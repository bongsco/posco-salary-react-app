import PropTypes from 'prop-types';
import '../../styles/table.css';
import styles from './high-organization-page.module.css';
import Switch from '#components/Switch';
import CheckBox from '#components/CheckBox';

function HighOrganizationTableRow({
  item,
  checkedItems,
  handleHighPerformGroupSwitch,
  handleCheckBox,
}) {
  /* DB에서 가져올 값 : 평가차등 가산율 정보 */
  const salaryPerRank = {
    S: {
      eval_diff_increment: 5.0,
      eval_diff_bonus: 400,
    },
    A: {
      eval_diff_increment: 4.5,
      eval_diff_bonus: 350,
    },
    B: {
      eval_diff_increment: 4.0,
      eval_diff_bonus: 300,
    },
  };
  /* DB에서 가져올 값 : 고성과조직 가산율 정보 */
  const evalAnnualSalaryIncrement = 2.0;
  const evalPerformProvideRate = 100;

  return (
    <tr key={item.emp_num} className={`${styles['table-row']}`}>
      <td>
        <div className={`${styles['check-box']}`}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => handleCheckBox(item.emp_num, item.isChecked)}
          />
        </div>
      </td>
      <td>{item.emp_num}</td>
      <td>{item.name}</td>
      <td>{item.dep_name}</td>
      <td>{item.grade_name}</td>
      <td>{item.rank_name}</td>
      <td>
        <div className={styles['switch-area']}>
          <p
            className={`${styles['switch-text']} ${
              item.in_high_perform_group ? styles.target : styles['non-target']
            }`}
          >
            {item.in_high_perform_group ? '대상' : '미대상'}
          </p>
          <Switch
            isOn={item.in_high_perform_group}
            onClick={() => {
              /* 코드 수정 */
              const targetEmpNums = checkedItems.includes(item.emp_num)
                ? checkedItems
                : [item.emp_num];
              handleHighPerformGroupSwitch(
                targetEmpNums,
                !item.in_high_perform_group,
              );
            }}
          />
        </div>
      </td>
      <td>
        {item.in_high_perform_group
          ? salaryPerRank[item.rank_name].eval_diff_increment +
            evalAnnualSalaryIncrement
          : salaryPerRank[item.rank_name].eval_diff_increment}
        %
      </td>
      <td>
        {item.in_high_perform_group
          ? salaryPerRank[item.rank_name].eval_diff_bonus +
            evalPerformProvideRate
          : salaryPerRank[item.rank_name].eval_diff_bonus}
        %
      </td>
    </tr>
  );
}

HighOrganizationTableRow.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool.isRequired,
      emp_num: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dep_name: PropTypes.string.isRequired,
      grade_name: PropTypes.string.isRequired,
      rank_name: PropTypes.string.isRequired,
      in_high_perform_group: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default HighOrganizationTableRow;
