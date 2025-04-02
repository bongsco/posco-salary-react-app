import { useState, useMemo, useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';

export default function PaybandConfigPage() {
  const [receivedPayband, setReceivedPayband] = useState([
    {
      id: 1,
      grade: 'P1',
      upperBound: 103,
      lowerBound: 70,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
    {
      id: 2,
      grade: 'P2',
      upperBound: 103,
      lowerBound: 80,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
    {
      id: 3,
      grade: 'P3',
      upperBound: 105,
      lowerBound: 90,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
    {
      id: 4,
      grade: 'P4',
      upperBound: 105,
      lowerBound: 95,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
    {
      id: 5,
      grade: 'P5',
      upperBound: 107,
      lowerBound: 95,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
    {
      id: 6,
      grade: 'P6',
      upperBound: 107,
      lowerBound: 100,
      modified: {
        lowerBound: false,
        upperBound: false,
      },
      error: {
        lowerBound: false,
        upperBound: false,
      },
    },
  ]);

  const hasError = (value) => {
    return (
      value === undefined ||
      String(value).trim() === '' ||
      Number.isNaN(Number(value)) ||
      value < 0 ||
      value > 200
    );
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'updatePayband':
        return action.payload;

      case 'changeWithIndex': {
        const updatedPayband = {
          ...action.payband,
          upperBound: action.upperBound,
          lowerBound: action.lowerBound,
        };

        updatedPayband.modified.upperBound = !(
          action.upperBound === action.originItem.upperBound
        );
        updatedPayband.modified.lowerBound = !(
          action.lowerBound === action.originItem.lowerBound
        );

        updatedPayband.error.upperBound = hasError(action.upperBound);
        updatedPayband.error.lowerBound = hasError(action.lowerBound);
        if (
          updatedPayband.lowerBound >= updatedPayband.upperBound &&
          !updatedPayband.error.upperBound &&
          !updatedPayband.error.lowerBound
        ) {
          updatedPayband.error.upperBound = true;
          updatedPayband.error.lowerBound = true;
        }

        return state.map((pb, i) => (i === action.idx ? updatedPayband : pb));
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, [
    ...structuredClone(receivedPayband),
  ]);

  const changedPayband = useMemo(() => {
    return state.filter(
      (pb) => pb.modified.lowerBound || pb.modified.upperBound,
    );
  }, [state]);

  // const [createdPayband, setCreatedPayband] = useState([]);
  // 생성된 기준과 바뀐 기준 api 다르게 줄 걸 대비해서 써놓음
  const needSave = useMemo(() => {
    return changedPayband.length > 0;
  }, [changedPayband]);

  return (
    <AdjustEditLayout
      prevStepPath="payment-rate"
      nextStepPath="../preparation/target"
      stepPaths={['기준 설정', 'Payband 설정']}
      onCommit={() => {
        if (state.every((pb) => !pb.error.upperBound && !pb.error.lowerBound)) {
          // 백엔드로 삭제 api
          const cleanPayband = state.map((item) => ({
            ...item,
            modified: {
              lowerBound: false,
              upperBound: false,
            },
          }));

          // 백엔드로 changedPayband 보냄
          setReceivedPayband(structuredClone(cleanPayband));
          dispatch({ type: 'updatePayband', payload: cleanPayband });

          // setCreatedPayband([]);
        }
      }}
      onRollback={() => {
        dispatch({
          type: 'updatePayband',
          payload: structuredClone(receivedPayband),
        });
        // setCreatedPayband([]);
      }}
      isCommitted={!needSave}
      canMove
    >
      <div className={`${styles.page}`}>
        <section>
          <h2>Payband 상한, 하한 설정</h2>

          <p>직급별 연봉 조정 결과의 상한, 하한을 설정합니다.</p>
          <div className={`${styles.whole_table}`}>
            <div className={`${styles.table_side}`}>단위: %</div>
            <table className={`${styles.table}`}>
              <thead>
                <tr>
                  <td>직급</td>
                  <td>하한</td>
                  <td>상한</td>
                  <td>
                    <div />
                  </td>
                </tr>
              </thead>
              <tbody>
                {state.map((item, index) => (
                  <PaybandTableRow
                    key={item.grade}
                    item={item}
                    onChange={(min, max) => {
                      dispatch({
                        type: 'changeWithIndex',
                        lowerBound: min,
                        upperBound: max,
                        idx: index,
                        originItem: receivedPayband[index],
                        payband: item,
                      });
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdjustEditLayout>
  );
}
