import PropTypes from 'prop-types';
import CheckBox from '#components/CheckBox';
import Switch from '#components/Switch';
import styles from './hpo-apply-page.module.css';

/* DB에서 가져올 값 : 평가차등 가산율 정보 */
function HighOrganizationTableRow({
  item,
  originalItem,
  checkedItems,
  handleHighPerformGroupSwitch,
  handleCheckBox,
  salaryIncrementByRank,
  hpoSalaryInfo,
}) {
  const isModifiedRow =
    originalItem &&
    item['고성과조직 가산 대상 여부'] !==
      originalItem['고성과조직 가산 대상 여부'];

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
      <td className={styles['column-name']}>{item['성명']}</td>
      <td className={styles['column-dep']}>{item['부서명']}</td>
      <td className={styles['column-grade']}>{item['직급명']}</td>
      <td className={styles['column-rank']}>{item['평가등급']}</td>
      <td
        className={`${styles['column-high-organization']} ${isModifiedRow ? styles.changedCell : ''}`}
      >
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
          ? (
              salaryIncrementByRank[item['직급명']][item['평가등급']]
                .salaryIncrementRate +
              hpoSalaryInfo.hpoSalaryIncrementRate +
              (salaryIncrementByRank[item['직급명']][item['평가등급']]
                .salaryIncrementRate *
                hpoSalaryInfo.hpoSalaryIncrementRate) /
                100
            ).toFixed(2)
          : salaryIncrementByRank[item['직급명']][item['평가등급']]
              .salaryIncrementRate}
        %
      </td>
      <td className={styles['column-bonus-multiplier']}>
        {item['고성과조직 가산 대상 여부']
          ? salaryIncrementByRank[item['직급명']][item['평가등급']]
              .bonusMultiplier + hpoSalaryInfo.hpoBonusMultiplier
          : salaryIncrementByRank[item['직급명']][item['평가등급']]
              .bonusMultiplier}
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
      성명: PropTypes.string.isRequired,
      부서명: PropTypes.string.isRequired,
      직급명: PropTypes.string.isRequired,
      평가등급: PropTypes.string.isRequired,
      '고성과조직 가산 대상 여부': PropTypes.bool.isRequired,
    }),
  ).isRequired,
  originalItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleHighPerformGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  salaryIncrementByRank: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        salaryIncrementRate: PropTypes.number.isRequired,
        bonusMultiplier: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  hpoSalaryInfo: PropTypes.shape({
    hpoSalaryIncrementRate: PropTypes.number.isRequired,
    hpoBonusMultiplier: PropTypes.number.isRequired,
  }).isRequired,
};

export default HighOrganizationTableRow;
