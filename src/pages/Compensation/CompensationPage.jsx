import { useReducer, useState, useEffect } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './compensation-page.module.css';
import CompensationSection from './CompensationSection';

/* 더미 데이터 */
const initialRankRate = {
  P3: {
    S: { value1: 0.8, value2: 400 },
    A: { value1: 0.8, value2: 400 },
    BPlus: { value1: 0.8, value2: 400 },
    B: { value1: 0.8, value2: 400 },
    C: { value1: 0.8, value2: 400 },
    D: { value1: 0.8, value2: 400 },
  },
  P4: {
    S: { value1: 0.6, value2: 350 },
    A: { value1: 0.6, value2: 350 },
    BPlus: { value1: 0.6, value2: 350 },
    B: { value1: 0.6, value2: 350 },
    C: { value1: 0.6, value2: 350 },
    D: { value1: 0.6, value2: 350 },
  },
};

const initialAdjInfo = {
  eval_annual_salary_increment: 0.2,
  eval_perform_provide_rate: 0.3,
};

/* 초기 상태 */
const initialState = {
  rankRate: initialRankRate,
  adjInfo: initialAdjInfo,
  backup: {
    rankRate: JSON.parse(JSON.stringify(initialRankRate)),
    adjInfo: JSON.parse(JSON.stringify(initialAdjInfo)),
  },
  isCommitted: true,
};

/* 상태 관리 함수 */
function reducer(state, action) {
  switch (action.type) {
    // 직급 & 등급별 보상 비율 값 변경
    case 'changeRankRate': {
      const { grade, rank, key, value } = action.payload;
      const updated = {
        ...state.rankRate,
        [grade]: {
          ...state.rankRate[grade],
          [rank]: {
            ...state.rankRate[grade][rank],
            [key]: value,
          },
        },
      };
      return {
        ...state,
        rankRate: updated,
        isCommitted: false,
      };
    }

    // 보상 조정 정보 변경
    case 'changeAdjInfo': {
      const { key, value } = action.payload;
      return {
        ...state,
        adjInfo: {
          ...state.adjInfo,
          [key]: value,
        },
        isCommitted: false,
      };
    }

    // 현재 상태를 백업하고 커밋 완료 상태로 전환
    case 'commit': {
      return {
        ...state,
        backup: {
          rankRate: JSON.parse(JSON.stringify(state.rankRate)),
          adjInfo: JSON.parse(JSON.stringify(state.adjInfo)),
        },
        isCommitted: true,
      };
    }

    // 마지막 커밋된 상태로 되돌리기
    case 'rollback': {
      return {
        ...state,
        rankRate: state.backup?.rankRate || state.rankRate,
        adjInfo: state.backup?.adjInfo || state.adjInfo,
        isCommitted: true,
      };
    }
    // 새로운 행 추가하기
    case 'addGradeRow': {
      const { grade } = action.payload;

      const newRanks = {
        S: { value1: '', value2: '' },
        A: { value1: '', value2: '' },
        BPlus: { value1: '', value2: '' },
        B: { value1: '', value2: '' },
        C: { value1: '', value2: '' },
        D: { value1: '', value2: '' },
      };

      return {
        ...state,
        rankRate: {
          ...state.rankRate,
          [grade]: newRanks,
        },
        isCommitted: false,
      };
    }

    // 알 수 없는 액션이면 기존 상태 그대로 반환
    default:
      return state;
  }
}

export default function CompensationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provoide_rate: false,
  });
  const [hasTypeError, setHasTypeError] = useState(false);

  useEffect(() => {
    if (state.isCommitted) {
      setErrorState({
        eval_annual_salary_increment: false,
        eval_perform_provoide_rate: false,
      });

      setHasTypeError(false);
    }
  }, [state.isCommitted]);

  // 테이블 셀 인풋 변경 핸들러
  const handleInputChange = (grade, rank, key, e) => {
    const input = e.target.value.trim();
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);

    dispatch({
      type: 'changeRankRate',
      payload: {
        grade,
        rank,
        key,
        value: isValidNumber ? Number(input) : input,
      },
    });
  };

  // 가산률 변경 핸들러
  const handleAdjustmentChange = (key, e) => {
    const isValid =
      /^-?\d*(\.\d+)?$/.test(e.target.value.trim()) &&
      e.target.value.trim() !== '';

    dispatch({
      type: 'changeAdjInfo',
      payload: {
        key,
        value: e.target.value,
      },
    });

    setErrorState((prev) => ({
      ...prev,
      [key]: !isValid,
    }));
  };

  const handleAddGradeRow = () => {
    dispatch({
      type: 'addGradeRow',
      payload: {
        grade: `NEW${Object.keys(state.rankRate).length + 1}`,
      },
    });
  };

  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="payband"
      stepPaths={['기준 설정', '보상지급률 설정']}
      onCommit={() => dispatch({ type: 'commit' })}
      onRollback={() => dispatch({ type: 'rollback' })}
      isCommitted={state.isCommitted}
    >
      <div className={styles.container}>
        {/* 1. 연봉인상률 */}
        <CompensationSection
          title="평가차등 연봉인상률 설정"
          description="직급 및 평가등급별 기준연봉 인상률을 설정합니다. 고성과조직 가산 대상은 인상률에 고성과조직 가산률 입력값이 곱해집니다."
          value={state.adjInfo.eval_annual_salary_increment.toString()}
          onInputChange={(e) =>
            handleAdjustmentChange('eval_annual_salary_increment', e)
          }
          inputError={errorState.eval_annual_salary_increment}
          tableData={state.rankRate}
          originalTableData={state.backup?.rankRate}
          onTableChange={handleInputChange}
          valueKey="value1"
          onAddGradeRow={handleAddGradeRow}
          hasTypeError={hasTypeError}
          setHasTypeError={setHasTypeError}
        />

        {/* 2. 경영성과금 지급률 */}
        <CompensationSection
          title="평가차등 경영성과금 지급률 설정"
          description="직급 및 평가등급별 경영성과금 지급 비율을 설정합니다. 고성과조직 가산 대상은 지급률에 고성과조직 가산률 입력값이 더해집니다."
          value={state.adjInfo.eval_perform_provide_rate.toString()}
          onInputChange={(e) =>
            handleAdjustmentChange('eval_perform_provide_rate', e)
          }
          inputError={errorState.eval_perform_provide_rate}
          tableData={state.rankRate}
          originalTableData={state.backup?.rankRate}
          onTableChange={handleInputChange}
          valueKey="value2"
          onAddGradeRow={handleAddGradeRow}
          hasTypeError={hasTypeError}
          setHasTypeError={setHasTypeError}
        />
      </div>
    </AdjustEditLayout>
  );
}
