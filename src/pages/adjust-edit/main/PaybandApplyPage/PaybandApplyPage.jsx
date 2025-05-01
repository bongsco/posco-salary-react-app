import { useMemo, useReducer } from 'react';
import useSWR from 'swr';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import constant from '#src/constant';
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
        isCommitted: state.isCommitted,
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
        isCommitted: state.isCommitted,
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
  const fetchWithAuth = useFetchWithAuth();

  const { data: apiData } = useSWR(
    adjust?.adjustId
      ? `/adjust/${adjust.adjustId}/main/payband/subjects`
      : null,
    async (url) => {
      try {
        const res = await fetchWithAuth(url);
        if (!res.ok) {
          addError(
            `Sent Request to ${url} (${process.env.REACT_APP_API_URL}) and the connection refused.`,
            `API Connection Error: ${res.status}`,
            'CONNECTION_REFUSED',
          );
        }
        return res.json();
      } catch (err) {
        addError(
          '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          err.message,
          'MAIN_ERROR',
        );
        return null;
      }
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

    if (updatedSubjects.length > 0) {
      const res = await fetchWithAuth(
        `/adjust/${adjust.adjustId}/main/payband/subjects`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updatedSubjects }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        addError(errorData.status, errorData.message, 'MAIN_ERROR');
      }
    }
    dispatch({ type: 'commit' });
  };

  const filteredUpperData = state.data.filter((item) => item.type === 'upper');
  const filteredLowerData = state.data.filter((item) => item.type === 'lower');

  const handleExcelDownload = async (type) => {
    try {
      const res = await fetchWithAuth(
        `/adjust/excel/download?adjustId=${adjust.adjustId}&pageType=${type}`,
        {
          headers: {
            Accept:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        },
      );
      if (!res.ok) throw new Error('엑셀 다운로드 실패');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bongsco_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      addError(
        '엑셀 다운로드 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        err.message,
        'EXCEL_DOWNLOAD_ERROR',
      );
    }
  };

  return (
    <AdjustEditLayout
      prevStepPath="../preparation/high-performance"
      nextStepPath="result"
      stepPaths={['본 연봉조정', 'Payband 적용']}
      onCommit={handleCommit}
      onRollback={() => dispatch({ type: 'rollback' })}
      isCommitted={state.isCommitted}
      stepId={constant.step.annual.main.payband}
    >
      <h1>상한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea
        type="upper"
        data={filteredUpperData}
        dispatch={dispatch}
        originalData={state.backup}
        handleExcelDownload={handleExcelDownload}
      />

      <h1>하한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea
        type="lower"
        data={filteredLowerData}
        dispatch={dispatch}
        originalData={state.backup}
        handleExcelDownload={handleExcelDownload}
      />
    </AdjustEditLayout>
  );
}

export default PaybandApplyPage;
