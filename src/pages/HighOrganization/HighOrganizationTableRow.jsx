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
      <td>{item.eval_diff_increment}%</td>
      <td>{item.eval_diff_bonus}%</td>
    </tr>
  );
}

HighOrganizationTableRow.propTypes = {
  item: PropTypes.arrayOf().isRequired,
  checkedItems: PropTypes.arrayOf().isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default HighOrganizationTableRow;
