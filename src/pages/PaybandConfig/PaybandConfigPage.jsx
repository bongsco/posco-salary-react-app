import CheckBox from '#components/CheckBox/CheckBox';
import Button from '#components/Button/Button';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

export default function PaybandConfigPage() {
  const payband = [
    {
      id: 1,
      grade: 'P3',
      upperBound: 70,
      lowerBound: 30,
      modified: [],
    },
    {
      id: 2,
      grade: 'P1',
      upperBound: 170,
      lowerBound: 20,
      modified: [],
    },
    {
      id: 3,
      grade: 'P2',
      upperBound: 80,
      lowerBound: 10,
      modified: [],
    },
    {
      id: 4,
      grade: 'P2',
      upperBound: 80,
      lowerBound: 10,
      modified: ['전체'],
    },
  ];

  const changedPayband = [];

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.title}`}>
        <div>Payband 설정</div>
        <div className={`${styles.buttonGroup}`}>
          <Button label="저장" size="xsmall" />
          <Button label="취소" size="xsmall" variant="secondary" />
        </div>
      </div>
      <div className={`${styles.subtitle}`}>Payband 상한, 하한 설정</div>
      <div className={`${styles.content}`}>
        직급별 연봉 조정 결과의 상한, 하한을 설정합니다.
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <div className={`${styles.table_cell}`}>
                <CheckBox />
              </div>
            </td>
            <td>직급</td>
            <td>하한</td>
            <td>상한</td>
            <td>
              <div />
            </td>
          </tr>
        </thead>
        <tbody>
          {payband.map((item, index) => (
            <PaybandTableRow
              key={item.id}
              item={item}
              onChange={(modifiedItem) => {
                payband[index] = modifiedItem;
                const changedPaybandIndex = changedPayband.findIndex(
                  (pb) => pb.id === modifiedItem.id,
                );
                if (changedPaybandIndex === -1) {
                  changedPayband.push(modifiedItem);
                } else {
                  changedPayband[changedPaybandIndex] = modifiedItem;
                }
              }}
            />
          ))}
        </tbody>
      </table>
      <div>
        <div className={`${styles.separator}`} />
      </div>
      <div className={`${styles.footer}`}>
        <div className={`${styles.buttonGroup}`}>
          <Button label="이전 단계" size="small" />
          <Button label="다음 단계" size="small" />
        </div>
      </div>
    </div>
  );
}
