import { useReducer, useRef } from 'react';
import CheckBox from '#components/CheckBox/CheckBox';
import Button from '#components/Button/Button';
import Stepper from '#components/Stepper/Stepper';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

export default function PaybandConfigPage() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const receivedPayband = useRef([
    {
      id: 1,
      grade: 'P3',
      upperBound: 70,
      lowerBound: 30,
      modified: [],
      error: [],
    },
    {
      id: 2,
      grade: 'P1',
      upperBound: 170,
      lowerBound: 20,
      modified: [],
      error: [],
    },
    {
      id: 3,
      grade: 'P2',
      upperBound: 80,
      lowerBound: 10,
      modified: [],
      error: [],
    },
    {
      id: 4,
      grade: undefined,
      upperBound: 80,
      lowerBound: 10,
      modified: ['전체'],
      error: [],
    },
  ]);
  const payband = useRef(structuredClone(receivedPayband.current));

  let changedPayband = [];

  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.title}`}>
        <div>Payband 설정</div>
        <div className={`${styles.buttonGroup}`}>
          <Button
            label="저장"
            size="xsmall"
            onClick={() => {
              if (payband.current.every((pb) => pb.error.length === 0)) {
                // changedPayband 백엔드 전송
                payband.current = payband.current.map((pb) => ({
                  ...pb,
                  modified: [], // 수정된 항목만 새로 할당
                }));
                receivedPayband.current = structuredClone(payband.current);
                changedPayband = [];
                forceUpdate();
              }
            }}
          />
          <Button
            label="취소"
            size="xsmall"
            variant="secondary"
            onClick={() => {
              forceUpdate();
              payband.current = structuredClone(receivedPayband.current);
              changedPayband = [];
            }}
          />
        </div>
      </div>
      <Stepper adjId={1} />
      <div className={`${styles.subtitle}`}>Payband 상한, 하한 설정</div>
      <div className={`${styles.content}`}>
        직급별 연봉 조정 결과의 상한, 하한을 설정합니다.
      </div>
      <table className={`${styles.table}`}>
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
          {payband.current.map((item, index) => (
            <PaybandTableRow
              key={item.id}
              item={item}
              onChange={(modifiedItem) => {
                payband.current[index] = modifiedItem;
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
