import { useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import PaybandApplyArea from './PaybandApplyArea';

// 🔹 초기 데이터
const initialPaybandApplyData = [
  {
    isChecked: false,
    emp_num: 'Pd000111',
    name: '홍',
    dep_name: '에너지조선마케팅실 해양플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000222',
    name: '홍길',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000333',
    name: '홍길동',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000444',
    name: '홍길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000555',
    name: '홍길동김박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 55000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000666',
    name: '홍길동김박이',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000777',
    name: '한길동김',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000888',
    name: '김치박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: false,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd000999',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd001000',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
  {
    isChecked: false,
    emp_num: 'Pd001001',
    name: '홍동박',
    dep_name: '에너지조선마케팅실 산기플랜트팀',
    grade_name: 'P6',
    rank_name: 'A',
    std_salary: 19000000,
    upper_limit_price: 50000000,
    lower_limit_price: 20000000,
    in_payband_use_group: true,
    remarks: '초과하는 내용은 클릭하면 표시되도록...',
  },
];

// 🔹 초기 상태
const initialState = {
  data: initialPaybandApplyData,
  backup: initialPaybandApplyData,
  isCommitted: true,
};

// 🔹 reducer 정의
function reducer(state, action) {
  switch (action.type) {
    case 'toggleCheck': {
      const updated = state.data.map((item) =>
        item.emp_num === action.payload.empNum
          ? { ...item, isChecked: !item.isChecked }
          : item,
      );
      return { ...state, data: updated, isCommitted: false };
    }

    case 'toggleGroup': {
      const { empNums, value } = action.payload;
      const updated = state.data.map((item) =>
        empNums.includes(item.emp_num)
          ? { ...item, in_payband_use_group: value }
          : item,
      );
      return { ...state, data: updated, isCommitted: false };
    }

    case 'commit':
      return {
        ...state,
        backup: JSON.parse(JSON.stringify(state.data)),
        isCommitted: true,
      };

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
      />

      <h1>하한 초과자 Payband 적용 여부 설정</h1>
      <PaybandApplyArea
        type="lower"
        data={filteredLowerData}
        dispatch={dispatch}
      />
    </AdjustEditLayout>
  );
}

export default PaybandApplyPage;
