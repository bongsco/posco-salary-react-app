import { useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import PaybandApplyArea from './PaybandApplyArea';

// 🔹 초기 데이터
const initialPaybandApplyData = [
  {
    isChecked: false,
    emp_num: 'Pd200111',
    name: '홍',
    dep_name: '에너지조선마케팅실 해양플랜트팀',
    grade_name: 'P6',
    rank_name: 'B+',
    std_salary: 75000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd060222',
    name: '홍길',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd070333',
    name: '홍길동',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 54000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000444',
    name: '홍길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'S',
    std_salary: 55300000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd200555',
    name: '홍길동김박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P3',
    rank_name: 'A',
    std_salary: 58000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd030666',
    name: '홍길동김박이',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 13000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd000777',
    name: '한길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P2',
    rank_name: 'A',
    std_salary: 10200000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd300888',
    name: '김치박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P2',
    rank_name: 'S',
    std_salary: 15300000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
  },
  {
    isChecked: false,
    emp_num: 'Pd100999',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 해양플랜트팀',
    grade_name: 'P1',
    rank_name: 'A',
    std_salary: 39000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd201000',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 해양플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 18000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd001001',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P1',
    rank_name: 'C',
    std_salary: 11000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd001002',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P3',
    rank_name: 'B',
    std_salary: 12000000,
    upper_limit_price: 70000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
  },
  {
    isChecked: false,
    emp_num: 'Pd501003',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 해양플랜트팀',
    grade_name: 'P4',
    rank_name: 'D',
    std_salary: 64000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
  },
];

// 🔹 초기 상태
const initialState = {
  data: initialPaybandApplyData,
  backup: initialPaybandApplyData,
  isCommitted: true,
};

function isSameData(data1, data2) {
  return JSON.stringify(data1) === JSON.stringify(data2);
}

// 🔹 reducer 정의
function reducer(state, action) {
  switch (action.type) {
    case 'toggleCheck': {
      const updated = state.data.map((item) =>
        item.emp_num === action.payload.empNum
          ? { ...item, isChecked: !item.isChecked }
          : item,
      );
      const isStillCommitted = isSameData(updated, state.backup);
      return { ...state, data: updated, isCommitted: isStillCommitted };
    }

    case 'toggleGroup': {
      const { empNums, value } = action.payload;
      const updated = state.data.map((item) =>
        empNums.includes(item.emp_num)
          ? { ...item, in_payband_use_group: value }
          : item,
      );
      const isStillCommitted = isSameData(updated, state.backup);
      return { ...state, data: updated, isCommitted: isStillCommitted };
    }

    // 🔹 전체 선택 / 선택 해제 처리
    case 'setAllChecked': {
      const { value, boundType } = action.payload;

      const updated = state.data.map((item) => {
        const isUpper = item.std_salary > item.upper_limit_price;
        const isLower = item.std_salary < item.lower_limit_price;

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

// 🔹 페이지 컴포넌트
function PaybandApplyPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredUpperData = state.data.filter(
    (item) => item.std_salary > item.upper_limit_price,
  );

  const filteredLowerData = state.data.filter(
    (item) => item.std_salary < item.lower_limit_price,
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
