import { useRef, useState } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import CheckBox from '#components/CheckBox/CheckBox';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';

export default function PaybandConfigPage() {
  const [needSave, setNeedSave] = useState(false);
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

  const [payband, setPayband] = useState(
    structuredClone(receivedPayband.current),
  );

  let changedPayband = [];

  return (
    <AdjustEditLayout
      prevStepPath="payment-rate"
      nextStepPath="../preparation/target"
      stepPaths={['기준 설정', 'Payband 설정']}
      onCommit={() => {
        let hasUndefinedGrade = false;

        setPayband((prev) => {
          const updatedPayband = prev.map((pb) => {
            const errors = [...pb.error];

            if (pb.grade === undefined) {
              if (!errors.includes('직급')) {
                errors.push('직급');
              }
              hasUndefinedGrade = true;
            }

            return { ...pb, error: errors };
          });

          return updatedPayband;
        });
        if (
          !hasUndefinedGrade &&
          payband.every((pb) => pb.error.length === 0)
        ) {
          // changedPayband 백엔드 전송
          setPayband((prev) => {
            const updatedPayband = prev.map((item) => ({
              ...item,
              modified: [],
            }));
            receivedPayband.current = structuredClone(updatedPayband);
            return updatedPayband;
          });
          changedPayband = [];
          setNeedSave(false);
        }
      }}
      onRollback={() => {
        setPayband(structuredClone(receivedPayband.current));
        changedPayband = [];
        setNeedSave(false);
      }}
      isCommited={!needSave}
    >
      <div className={`${styles.page}`}>
        <div className={`${styles.subtitle}`}>Payband 상한, 하한 설정</div>
        <div className={`${styles.content}`}>
          직급별 연봉 조정 결과의 상한, 하한을 설정합니다.
        </div>
        <div>
          <div className={`${styles.unit_label}`}>단위: %</div>
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
              {payband.map((item, index) => (
                <PaybandTableRow
                  key={item.id}
                  item={item}
                  originItem={receivedPayband.current[index]}
                  onChange={(modifiedItem) => {
                    setPayband((prev) =>
                      prev.map((pb, i) => (i === index ? modifiedItem : pb)),
                    );
                    const changedPaybandIndex = changedPayband.findIndex(
                      (pb) => pb.id === modifiedItem.id,
                    );
                    if (changedPaybandIndex === -1) {
                      changedPayband.push(modifiedItem);
                    } else {
                      changedPayband[changedPaybandIndex] = modifiedItem;
                    }
                    if (!needSave) {
                      setNeedSave(true);
                    }
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdjustEditLayout>
  );
}
