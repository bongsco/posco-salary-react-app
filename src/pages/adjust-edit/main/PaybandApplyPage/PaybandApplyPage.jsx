import { useMemo, useReducer } from 'react';
import useSWR from 'swr';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import fetchApi from '#utils/fetch';
import PaybandApplyArea from './PaybandApplyArea';
import '#styles/global.css';
import '#styles/table.css';

const isSameData = (data1, data2) =>
  JSON.stringify(data1) === JSON.stringify(data2);

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        data: action.payload,
        backup: JSON.parse(JSON.stringify(action.payload)),
        isCommitted: true,
      };
    case 'toggleCheck': {
      const updated = state.data.map((item) =>
        item.직번 === action.payload.empNum
          ? { ...item, isChecked: !item.isChecked }
          : item,
      );
      const checkedItems = updated
        .filter((i) => i.isChecked)
        .map((i) => i.직번);
      return {
        ...state,
        data: updated,
        checkedItems,
        isCommitted: isSameData(updated, state.backup),
      };
    }
    case 'toggleGroup': {
      const { empNums, value } = action.payload;
      const updated = state.data.map((item) =>
        empNums.includes(item.직번) ? { ...item, Payband적용: value } : item,
      );
      return {
        ...state,
        data: updated,
        isCommitted: isSameData(updated, state.backup),
      };
    }
    case 'setAllChecked': {
      const { empNums, value } = action.payload;
      const updated = state.data.map((item) =>
        empNums.includes(item.직번) ? { ...item, isChecked: value } : item,
      );
      const checkedItems = updated
        .filter((i) => i.isChecked)
        .map((i) => i.직번);
      return {
        ...state,
        data: updated,
        checkedItems,
        isCommitted: isSameData(updated, state.backup),
      };
    }
    case 'commit': {
      const cleared = state.data.map((item) => ({ ...item, isChecked: false }));
      return {
        ...state,
        data: cleared,
        backup: JSON.parse(JSON.stringify(cleared)),
        isCommitted: true,
      };
    }
    case 'rollback':
      return {
        ...state,
        data: state.backup,
        isCommitted: true,
      };
    default:
      return state;
  }
}

function PaybandApplyPage() {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();

  const { data: apiData } = useSWR(
    adjust?.adjustId
      ? `/adjust/${adjust.adjustId}/main/payband/subjects`
      : null,
    async (url) => {
      const res = await fetchApi(url);
      if (!res.ok) {
        addError(
          `Sent Request to ${url} (${process.env.REACT_APP_API_URL}) and the connection refused.`,
          `API Connection Error: ${res.status}`,
          'CONNECTION_REFUSED',
        );
      }
      return res.json();
    },
  );

  const transformItem = (item, type) => ({
    isChecked: false,
    직번: item.empNum,
    성명: item.name,
    부서: item.depName,
    직급: item.gradeName,
    평가등급: item.rankCode,
    기준연봉: item.stdSalary,
    상한금액: type === 'upper' ? item.limitPrice : 0,
    하한금액: type === 'lower' ? item.limitPrice : 0,
    Payband적용:
      type === 'upper'
        ? item.isPaybandApplied === 'UPPER'
        : item.isPaybandApplied === 'LOWER',
    adjustSubjectId: item.adjustSubjectId,
    type,
  });

  const initialData = useMemo(() => {
    if (!apiData) return [];
    const upper = apiData.upperAdjustSubjects.map((item) =>
      transformItem(item, 'upper'),
    );
    const lower = apiData.lowerAdjustSubjects.map((item) =>
      transformItem(item, 'lower'),
    );
    return [...upper, ...lower];
  }, [apiData]);

  const [state, dispatch] = useReducer(reducer, {
    data: [],
    backup: [],
    isCommitted: true,
  });

  useMemo(() => {
    if (initialData.length > 0) {
      dispatch({ type: 'init', payload: initialData });
    }
  }, [initialData]);

  const handleCommit = async () => {
    const updatedSubjects = state.data
      .filter((item) => {
        const original = state.backup.find((o) => o.직번 === item.직번);
        return original && original.Payband적용 !== item.Payband적용;
      })
      .map((item) => {
        let appliedType = 'NONE';
        if (item.Payband적용) {
          appliedType = item.type === 'upper' ? 'UPPER' : 'LOWER';
        }

        return {
          adjustSubjectId: item.adjustSubjectId,
          isPaybandApplied: appliedType,
        };
      });

    try {
      if (updatedSubjects.length > 0) {
        await fetchApi(`/adjust/${adjust.adjustId}/main/payband/subjects`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updatedSubjects }),
        });
      }
      dispatch({ type: 'commit' });
    } catch (err) {
      addError(
        'Failed to update Payband status.',
        'Update Error',
        'UPDATE_FAIL',
      );
    }
  };

  const filteredUpperData = state.data.filter((item) => item.type === 'upper');
  const filteredLowerData = state.data.filter((item) => item.type === 'lower');

  return (
    <AdjustEditLayout
      prevStepPath="../preparation/high-performance"
      nextStepPath="result"
      stepPaths={['본 연봉조정', 'Payband 적용']}
      onCommit={handleCommit}
      onRollback={() => dispatch({ type: 'rollback' })}
      isCommitted={state.isCommitted}
    >
      <h1>상한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea
        type="upper"
        data={filteredUpperData}
        dispatch={dispatch}
        originalData={state.backup}
      />

      <h1>하한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea
        type="lower"
        data={filteredLowerData}
        dispatch={dispatch}
        originalData={state.backup}
      />
    </AdjustEditLayout>
  );
}

export default PaybandApplyPage;
