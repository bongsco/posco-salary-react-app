import { useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import PaybandApplyArea from './PaybandApplyArea';

// 🔹 초기 데이터
const initialPaybandApplyData = [
  {
    isChecked: false,
    직번: 'pd09468',
    성명: '김서영',
    부서: 'IT사업실 ERP운영섹션',
    직급: 'P6',
    평가등급: 'S',
    기준연봉: 96390000,
    상한금액: 96300000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd08206',
    성명: '김현아',
    부서: 'IT사업실 이차전지운영팀',
    직급: 'P4',
    평가등급: 'B+',
    기준연봉: 74340000,
    상한금액: 73500000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd04274',
    성명: '한상진',
    부서: 'IT사업실 ERP개발섹션',
    직급: 'P2',
    평가등급: 'C',
    기준연봉: 51600000,
    상한금액: 51500000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd00444',
    성명: '정경진',
    부서: 'IT사업실 스마트팩토리개발팀',
    직급: 'P6',
    평가등급: 'S',
    기준연봉: 55300000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd20555',
    성명: '장수민',
    부서: 'IT사업실 스마트팩토리개발팀',
    직급: 'P3',
    평가등급: 'A',
    기준연봉: 58000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd03666',
    성명: '이창진',
    부서: 'IT사업실 스마트팩토리개발팀',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 13000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd00777',
    성명: '한다연',
    부서: 'IT사업실 이차전지운영팀',
    직급: 'P2',
    평가등급: 'A',
    기준연봉: 10200000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd30888',
    성명: '이지은',
    부서: 'IT사업실 이차전지운영팀',
    직급: 'P2',
    평가등급: 'S',
    기준연봉: 15300000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: false,
  },
  {
    isChecked: false,
    직번: 'pd10099',
    성명: '이효원',
    부서: 'IT사업실 ERP운영섹션',
    직급: 'P1',
    평가등급: 'A',
    기준연봉: 39000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd20100',
    성명: '서지현',
    부서: 'IT사업실 ERP운영섹션',
    직급: 'P6',
    평가등급: 'A',
    기준연봉: 18000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd01001',
    성명: '김길호',
    부서: 'IT사업실 ERP운영섹션',
    직급: 'P1',
    평가등급: 'C',
    기준연봉: 11000000,
    상한금액: 50000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd01002',
    성명: '홍진수',
    부서: 'IT사업실 이차전지운영팀',
    직급: 'P3',
    평가등급: 'B',
    기준연봉: 12000000,
    상한금액: 70000000,
    하한금액: 20000000,
    Payband적용: true,
  },
  {
    isChecked: false,
    직번: 'pd50103',
    성명: '이장우',
    부서: 'IT사업실 이차전지운영팀',
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

      const updatedCheckedItems = updated
        .filter((item) => item.isChecked)
        .map((item) => item.직번); // isChecked가 true인 직번만 포함

      const isStillCommitted = isSameData(updated, state.backup);
      return {
        ...state,
        data: updated,
        checkedItems: updatedCheckedItems,
        isCommitted: isStillCommitted,
      };
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
      const { value, empNums } = action.payload;

      const updated = state.data.map((item) =>
        empNums.includes(item.직번) ? { ...item, isChecked: value } : item,
      );

      const updatedCheckedItems = updated
        .filter((item) => item.isChecked)
        .map((item) => item.직번);

      const isStillCommitted = isSameData(updated, state.backup);
      return {
        ...state,
        data: updated,
        checkedItems: updatedCheckedItems,
        isCommitted: isStillCommitted,
      };
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

  // 기준연봉이 상한금액보다 높은 데이터
  const filteredUpperData = state.data.filter(
    (item) => item.기준연봉 > item.상한금액,
  );

  // 기준연봉이 하한금액보다 낮은 데이터
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
      stepId="ANNUAL_MAIN_PAYBAND_000"
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
