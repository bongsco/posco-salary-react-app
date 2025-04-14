import { useMemo, useReducer, useState } from 'react';
import useSWR from 'swr';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import constant from '#src/constant';
import fetchApi from '#utils/fetch';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-criteria-page.module.css';
import '#styles/global.css';
import '#styles/table.css';

export default function PaybandCriteriaPage() {
  const { addError } = useErrorHandlerContext();
  const { adjust } = useAdjustContext();
  const [receivedPayband, setReceivedPayband] = useState([]);

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

  useSWR(
    adjust?.adjustId ? `/adjust/${adjust.adjustId}/criteria/payband` : null,
    async (url) => {
      const res = await fetchApi(url);
      if (!res?.ok) {
        const errorData = await res.json();
        addError(errorData.status, errorData.message, 'CRITERIA_ERROR');
      }

      return res.json();
    },
    {
      onSuccess: (response) => {
        const updatedPayband = response.paybandCriteriaConfigs
          .map((item) => ({
            ...item,
            modified: {
              lowerBound: false,
              upperBound: false,
            },
            error: {
              lowerBound: false,
              upperBound: false,
            },
          }))
          .sort((a, b) => a.id - b.id);

        setReceivedPayband(updatedPayband);

        dispatch({
          type: 'updatePayband',
          payload: structuredClone(updatedPayband),
        });
      },
    },
  );

  const changedPayband = useMemo(() => {
    return state
      .filter((pb) => pb.modified.lowerBound || pb.modified.upperBound)
      .map((pb) => ({
        id: pb.id,
        lowerBound: pb.lowerBound,
        upperBound: pb.upperBound,
      }));
  }, [state]);

  // const [createdPayband, setCreatedPayband] = useState([]);
  // 생성된 기준과 바뀐 기준 api 다르게 줄 걸 대비해서 써놓음
  const needSave = useMemo(() => {
    return changedPayband.length > 0;
  }, [changedPayband]);

  return (
    <AdjustEditLayout
      prevStepPath="payment-rate"
      nextStepPath="../preparation/subject"
      stepPaths={['기준 설정', 'Payband 설정']}
      stepId={constant.step.annual.criteria.subject}
      onCommit={async () => {
        if (state.every((pb) => !pb.error.upperBound && !pb.error.lowerBound)) {
          const cleanPayband = state.map((item) => ({
            ...item,
            modified: {
              lowerBound: false,
              upperBound: false,
            },
          }));

          const patchBody = {
            paybandCriteriaModifyDetailList: changedPayband,
          };

          const res = await fetchApi(
            `/adjust/${adjust.adjustId}/criteria/payband`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(patchBody),
            },
          );

          if (!res.ok) {
            throw new Error('PATCH 요청 실패');
          } else {
            setReceivedPayband(structuredClone(cleanPayband));
            dispatch({ type: 'updatePayband', payload: cleanPayband });
          }
        }
      }}
      onRollback={() => {
        dispatch({
          type: 'updatePayband',
          payload: structuredClone(receivedPayband),
        });
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
