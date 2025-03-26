import { useState, useMemo } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import CheckBox from '#components/CheckBox/CheckBox';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';
import Button from '#components/Button';

export default function PaybandConfigPage() {
  const [receivedPayband, setReceivedPayband] = useState([
    {
      id: 1,
      grade: 'P3',
      upperBound: 70,
      lowerBound: 30,
      modified: [],
      error: [],
      isChecked: false,
    },
    {
      id: 2,
      grade: 'P1',
      upperBound: 170,
      lowerBound: 20,
      modified: [],
      error: [],
      isChecked: false,
    },
    {
      id: 3,
      grade: 'P2',
      upperBound: 80,
      lowerBound: 10,
      modified: [],
      error: [],
      isChecked: false,
    },
  ]);

  const [payband, setPayband] = useState(structuredClone(receivedPayband));

  const [changedPayband, setChangedPayband] = useState([]);

  const [deletedPayband, setDeletedPayband] = useState([]);

  // const [createdPayband, setCreatedPayband] = useState([]);
  // 생성된 기준과 바뀐 기준 api 다르게 줄 걸 대비해서 써놓음
  const needSave = useMemo(() => {
    return changedPayband.length > 0 || deletedPayband.length > 0;
  }, [changedPayband, deletedPayband]);

  const allChecked = useMemo(() => {
    return payband.length > 0 && payband.every((pb) => pb.isChecked);
  }, [payband]);

  return (
    <AdjustEditLayout
      prevStepPath="payment-rate"
      nextStepPath="../preparation/target"
      stepPaths={['기준 설정', 'Payband 설정']}
      onCommit={() => {
        const updatedPayband = payband.map((pb) => {
          let errors = [...pb.error];
          if (deletedPayband.some((d) => d.id === pb.id)) {
            errors = [];
          } else if (pb.grade === undefined && !errors.includes('직급')) {
            errors.push('직급');
          } else if (pb.grade !== undefined) {
            const idx = errors.indexOf('직급');
            if (idx > -1) errors.splice(idx, 1);
          }

          return { ...pb, error: errors };
        });

        setPayband(updatedPayband);

        if (updatedPayband.every((pb) => pb.error.length === 0)) {
          // 백엔드로 삭제 api
          const cleanPayband = updatedPayband
            .filter(
              (item) =>
                !deletedPayband.some((deleted) => deleted.id === item.id),
            )
            .map((item) => ({
              ...item,
              modified: [],
            }));
          setChangedPayband((prev) =>
            prev.filter(
              (item) =>
                !deletedPayband.some((deleted) => deleted.id === item.id),
            ),
          );
          setDeletedPayband([]);
          // 백엔드로 changedPayband 보냄
          // createdPayband에서도 지워진 payband는 지움
          // 백엔드로 createdPayband 보냄
          setPayband(cleanPayband);
          setReceivedPayband(structuredClone(cleanPayband));
          setChangedPayband([]);
          // setCreatedPayband([]);
        }
      }}
      onRollback={() => {
        setPayband(structuredClone(receivedPayband));
        setChangedPayband([]);
        // setCreatedPayband([]);
        setDeletedPayband([]);
      }}
      isCommitted={!needSave}
      canMove
    >
      <div className={`${styles.page}`}>
        <h2>Payband 상한, 하한 설정</h2>
        <p>직급별 연봉 조정 결과의 상한, 하한을 설정합니다.</p>
        <div>
          <div className={`${styles.table_side}`}>
            <div>
              {payband.some((pb) => pb.isChecked) && (
                <Button
                  label="삭제"
                  size="small"
                  variant="secondary"
                  onClick={() => {
                    setDeletedPayband((prev) => {
                      const newItems = payband.filter(
                        (item) =>
                          item.isChecked && !prev.some((d) => d.id === item.id),
                      );
                      return [...prev, ...newItems];
                    });
                  }}
                />
              )}
            </div>
            <div className={`${styles.unit_label}`}>단위: %</div>
          </div>
          <table className={`${styles.table}`}>
            <thead>
              <tr>
                <td>
                  <div className={`${styles.table_cell}`}>
                    <CheckBox
                      isChecked={allChecked}
                      onClick={() => {
                        setPayband((prev) =>
                          prev.map((pb) => {
                            return { ...pb, isChecked: !allChecked };
                          }),
                        );
                      }}
                    />
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
                  isDeleted={deletedPayband.some((d) => d.id === item.id)}
                  originItem={receivedPayband[index]}
                  onChange={(modifiedItem) => {
                    setPayband((prev) =>
                      prev.map((pb, i) => (i === index ? modifiedItem : pb)),
                    );
                    const changedPaybandIndex = changedPayband.findIndex(
                      (pb) => pb.id === modifiedItem.id,
                    );
                    if (changedPaybandIndex === -1) {
                      setChangedPayband((prev) => [...prev, modifiedItem]);
                    } else {
                      setChangedPayband((prev) => {
                        const updated = [...prev];
                        updated[changedPaybandIndex] = modifiedItem;
                        return updated;
                      });
                    }
                  }}
                  onChecked={(isChecked, modifiedItem) => {
                    setPayband((prev) =>
                      prev.map((pb, i) => (i === index ? modifiedItem : pb)),
                    );
                  }}
                />
              ))}
              <tr>
                <td colSpan="5" className="button_td">
                  <button
                    type="button"
                    className="add_column"
                    aria-label="add_button"
                    onClick={() => {
                      const newId =
                        payband.length > 0
                          ? payband[payband.length - 1].id + 1
                          : Math.floor(Math.random() * 100000); // 랜덤 ID 는 api에서 마지막id 가져오는 방식으로 나중에 바꿔야할 듯
                      const newItem = {
                        id: newId,
                        grade: undefined,
                        upperBound: 70,
                        lowerBound: 30,
                        modified: ['전체'],
                        error: [],
                        isChecked: false,
                      };
                      setPayband((prev) => [...prev, newItem]);
                      setChangedPayband((prev) => [...prev, newItem]);
                      // setCreatedPayband
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdjustEditLayout>
  );
}
