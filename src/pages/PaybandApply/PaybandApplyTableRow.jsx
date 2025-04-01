import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import Switch from '#components/Switch';
import CheckBox from '#components/CheckBox';

function PaybandApplyTableRow({
  item,
  type,
  checkedItems,
  handlePaybandApplyGroupSwitch,
  handleCheckBox,
  originalItem,
}) {
  const isModified =
    originalItem &&
    item.in_payband_use_group !== originalItem.in_payband_use_group;

  return (
    <tr key={item.emp_num} className={styles['table-row']}>
      <td>
        <div className={styles['check-box']}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => handleCheckBox(item.emp_num)}
          />
        </div>
      </td>
      <td className={styles['no-wrap']}>{item.emp_num}</td>
      <td className={styles['no-wrap']}>{item.name}</td>
      <td className={styles['department-cell']}>{item.dep_name}</td>
      <td className={styles['no-wrap']}>{item.grade_name}</td>
      <td className={styles['no-wrap']}>{item.rank_name}</td>
      <td className={styles['no-wrap']}>{item.std_salary.toLocaleString()}</td>
      <td className={styles['no-wrap']}>
        {type === 'upper'
          ? item.upper_limit_price.toLocaleString()
          : item.lower_limit_price.toLocaleString()}
      </td>
      <td
        className={`${styles['no-wrap']} ${isModified ? styles.changedCell : ''}`}
      >
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
    </tr>
  );
}

PaybandApplyTableRow.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  item: PropTypes.arrayOf().isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePaybandApplyGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  originalItem: PropTypes.shape({
    emp_num: PropTypes.string,
    in_payband_use_group: PropTypes.bool,
  }).isRequired,
};

export default PaybandApplyTableRow;
