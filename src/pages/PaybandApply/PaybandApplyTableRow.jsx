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
    originalItem && item.Payband적용 !== originalItem.Payband적용;

  return (
    <tr key={item.직번} className={styles['table-row']}>
      <td>
        <div className={styles['check-box']}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => handleCheckBox(item.직번)}
          />
        </div>
      </td>
      <td className={styles['no-wrap']}>{item.직번}</td>
      <td className={styles['no-wrap']}>{item.성명}</td>
      <td className={styles['department-cell']}>{item.부서}</td>
      <td className={styles['no-wrap']}>{item.직급}</td>
      <td className={styles['no-wrap']}>{item.평가등급}</td>
      <td className={styles['no-wrap']}>{item.기준연봉.toLocaleString()}</td>
      <td className={styles['no-wrap']}>
        {type === 'upper'
          ? item.상한금액.toLocaleString()
          : item.하한금액.toLocaleString()}
      </td>
      <td
        className={`${styles['no-wrap']} ${isModified ? styles.changedCell : ''}`}
      >
        <div className={styles['switch-area']}>
          <p
            className={`${styles['switch-text']} ${
              item.Payband적용 ? styles.target : styles['non-target']
            }`}
          >
            {item.Payband적용 ? '적용' : '미적용'}
          </p>
          <Switch
            isOn={item.Payband적용}
            onClick={() => {
              const targetEmpNums = checkedItems.includes(item.직번)
                ? checkedItems
                : [item.직번];
              handlePaybandApplyGroupSwitch(targetEmpNums, !item.Payband적용);
            }}
          />
        </div>
      </td>
    </tr>
  );
}

PaybandApplyTableRow.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  item: PropTypes.shape({
    직번: PropTypes.string.isRequired,
    성명: PropTypes.string.isRequired,
    부서: PropTypes.string.isRequired,
    직급: PropTypes.string.isRequired,
    평가등급: PropTypes.string.isRequired,
    기준연봉: PropTypes.number.isRequired,
    상한금액: PropTypes.number.isRequired,
    하한금액: PropTypes.number.isRequired,
    Payband적용: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
  }).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePaybandApplyGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  originalItem: PropTypes.shape({
    직번: PropTypes.string,
    Payband적용: PropTypes.bool,
  }).isRequired,
};

export default PaybandApplyTableRow;
