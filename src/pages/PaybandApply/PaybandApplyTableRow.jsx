import PropTypes from 'prop-types';
import '../../styles/table.css';
import styles from './payband-apply-page.module.css';
import Switch from '#components/Switch';
import CheckBox from '#components/CheckBox';

function PaybandApplyTableRow({
  item,
  type,
  checkedItems,
  handlePaybandApplyGroupSwitch,
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
      <td>{item.std_salary}</td>
      <td>
        {type === 'upper' ? item.upper_limit_price : item.lower_limit_price}
      </td>
      <td>
        <div className={styles['switch-area']}>
          <p
            className={`${styles['switch-text']} ${
              item.in_payband_use_group ? styles.target : styles['non-target']
            }`}
          >
            {item.in_payband_use_group ? '적용' : '미적용'}
          </p>
          <Switch
            isOn={item.in_payband_use_group}
            onClick={() => {
              const targetEmpNums = checkedItems.includes(item.emp_num)
                ? checkedItems
                : [item.emp_num];
              handlePaybandApplyGroupSwitch(
                targetEmpNums,
                !item.in_payband_use_group,
              );
            }}
          />
        </div>
      </td>
      <td>{item.remarks}</td>
    </tr>
  );
}

PaybandApplyTableRow.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  item: PropTypes.arrayOf().isRequired,
  checkedItems: PropTypes.arrayOf().isRequired,
  handlePaybandApplyGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default PaybandApplyTableRow;
