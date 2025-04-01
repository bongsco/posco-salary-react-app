import PropTypes from 'prop-types';
import styles from './high-organization-page.module.css';
import Switch from '#components/Switch';
import CheckBox from '#components/CheckBox';

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

function HighOrganizationTableRow({
  item,
  checkedItems,
  handleHighPerformGroupSwitch,
  handleCheckBox,
}) {
  return (
    <tr key={item['직번']} className={`${styles['table-row']}`}>
      <td>
        <div className={`${styles['check-box']}`}>
          <CheckBox
            isChecked={item.isChecked}
            onClick={() => handleCheckBox(item['직번'], item.isChecked)}
          />
        </div>
      </td>
      <td className={styles['column-emp-num']}>{item['직번']}</td>
      <td className={styles['column-name']}>{item['직원성명']}</td>
      <td className={styles['column-dep']}>{item['부서명']}</td>
      <td className={styles['column-grade']}>{item['직급명']}</td>
      <td className={styles['column-rank']}>{item['등급코드']}</td>
      <td className={styles['column-high-organization']}>
        <div className={styles['switch-area']}>
          <p
            className={`${styles['switch-text']} ${
              item['고성과조직 가산 대상 여부']
                ? styles.target
                : styles['non-target']
            }`}
          >
            {item['고성과조직 가산 대상 여부'] ? '대상' : '미대상'}
          </p>
          <Switch
            isOn={item['고성과조직 가산 대상 여부']}
            onClick={() => {
              /* Checkbox에 선택된 데이터이면 CheckItems를 넘겨주고, 아니면 해당 Item만 넘겨줌 */
              const targetEmpNums = checkedItems.includes(item['직번'])
                ? checkedItems
                : [item['직번']];
              handleHighPerformGroupSwitch(
                targetEmpNums,
                !item['고성과조직 가산 대상 여부'],
              );
            }}
          />
        </div>
      </td>
      <td className={styles['column-perform-add-payment']}>
        {item['고성과조직 가산 대상 여부']
          ? salaryPerRank[item['등급코드']].eval_diff_increment +
            evalAnnualSalaryIncrement
          : salaryPerRank[item['등급코드']].eval_diff_increment}
        %
      </td>
      <td className={styles['column-emp-num']}>
        {item['고성과조직 가산 대상 여부']
          ? salaryPerRank[item['등급코드']].eval_diff_bonus +
            evalPerformProvideRate
          : salaryPerRank[item['등급코드']].eval_diff_bonus}
        %
      </td>
    </tr>
  );
}

HighOrganizationTableRow.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool.isRequired,
      직번: PropTypes.string.isRequired,
      직원성명: PropTypes.string.isRequired,
      부서명: PropTypes.string.isRequired,
      직급명: PropTypes.string.isRequired,
      등급코드: PropTypes.string.isRequired,
      '고성과조직 가산 대상 여부': PropTypes.bool.isRequired,
    }),
  ).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default HighOrganizationTableRow;
