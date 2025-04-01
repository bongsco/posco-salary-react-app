import { useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import PaybandApplyArea from './PaybandApplyArea';

// 🔹 초기 데이터
const initialPaybandApplyData = [
  {
    isChecked: false,
    직번: 'Pd200111',
    이름: '홍',
    부서: '에너지조선마케팅실 해양플랜트팀',
    직급: 'P6',
    평가등급: 'B+',
    기준연봉: 75000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd060222',
    이름: '홍길',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 55000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd070333',
    이름: '홍길동',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 54000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd000444',
    이름: '홍길동김',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P6',
    평가등급: 'S',
    기준연봉: 55300000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd200555',
    이름: '홍길동김박',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P3',
    평가등급: 'A',
    기준연봉: 58000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd030666',
    이름: '홍길동김박이',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 13000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd000777',
    이름: '한길동김',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P2',
    평가등급: 'A',
    기준연봉: 10200000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd300888',
    이름: '김치박',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P2',
    평가등급: 'S',
    기준연봉: 15300000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'Pd100999',
    이름: '홍동박',
    부서: '에너지조선마케팅실 해양플랜트팀',
    직급: 'P1',
    평가등급: 'A',
    기준연봉: 39000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'Pd201000',
    이름: '홍동박',
    부서: '에너지조선마케팅실 해양플랜트팀',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 18000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'Pd001001',
    이름: '홍동박',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P1',
    평가등급: 'C',
    기준연봉: 11000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'Pd001002',
    이름: '홍동박',
    부서: '에너지조선마케팅실 산기플랜트팀',
    직급: 'P3',
    평가등급: 'B',
    기준연봉: 12000000,
    상한금액: 70000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'Pd501003',
    이름: '홍동박',
    부서: '에너지조선마케팅실 해양플랜트팀',
    직급: 'P4',
    평가등급: 'D',
    기준연봉: 64000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
];

const initialState = {
  data: initialPaybandApplyData,
  backup: initialPaybandApplyData,
  isCommitted: true,
};

function isSameData(data1, data2) {
  return JSON.stringify(data1) === JSON.stringify(data2);
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggleCheck': {
      const updated = state.data.map((item) =>
        item.직번 === action.payload.empNum
          ? { ...item, isChecked: !item.isChecked }
          : item,
      );
      const isStillCommitted = isSameData(updated, state.backup);
      return { ...state, data: updated, isCommitted: isStillCommitted };
    }

    case 'toggleGroup': {
      const { empNums, value } = action.payload;
      const updated = state.data.map((item) =>
        empNums.includes(item.직번) ? { ...item, Payband적용: value } : item,
      );
      const isStillCommitted = isSameData(updated, state.backup);
      return { ...state, data: updated, isCommitted: isStillCommitted };
    }

    case 'setAllChecked': {
      const { value, boundType } = action.payload;

      const updated = state.data.map((item) => {
        const isUpper = item.기준연봉 > item.상한금액;
        const isLower = item.기준연봉 < item.하한금액;

        const isTarget =
          (boundType === 'upper' && isUpper) ||
          (boundType === 'lower' && isLower);

        return isTarget ? { ...item, isChecked: value } : item;
      });

      const isStillCommitted = isSameData(updated, state.backup);
      return { ...state, data: updated, isCommitted: isStillCommitted };
    }

    case 'commit': {
      const cleared = state.data.map((item) => ({
        ...item,
        isChecked: false,
      }));

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredUpperData = state.data.filter(
    (item) => item.기준연봉 > item.상한금액,
  );

  const filteredLowerData = state.data.filter(
    (item) => item.기준연봉 < item.하한금액,
  );

  return (
    <AdjustEditLayout
      prevStepPath="../preparation/high-performance"
      nextStepPath="result"
      stepPaths={['본 연봉조정', 'Payband 적용']}
      onCommit={() => dispatch({ type: 'commit' })}
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
