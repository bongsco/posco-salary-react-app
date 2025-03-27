import { useReducer, useState, useEffect } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './compensation-page.module.css';
import CompensationSection from './CompensationSection';

/* =============================
  🔹 초기 더미 데이터 정의
============================= */
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

/* =============================
  🔹 상태 초기값 정의
============================= */
const initialState = {
  rankRate: initialRankRate,
  adjInfo: initialAdjInfo,
  backup: {
    rankRate: JSON.parse(JSON.stringify(initialRankRate)),
    adjInfo: JSON.parse(JSON.stringify(initialAdjInfo)),
  },
  isCommitted: true,
};

/* =============================
  🔹 상태 관리용 Reducer
============================= */
function reducer(state, action) {
  switch (action.type) {
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

    case 'commit': {
      const { updatedRankRate } = action.payload;
      return {
        ...state,
        rankRate: updatedRankRate,
        backup: {
          rankRate: JSON.parse(JSON.stringify(updatedRankRate)),
          adjInfo: JSON.parse(JSON.stringify(state.adjInfo)),
        },
        isCommitted: true,
      };
    }

    case 'rollback': {
      return {
        ...state,
        rankRate: state.backup?.rankRate || state.rankRate,
        adjInfo: state.backup?.adjInfo || state.adjInfo,
        isCommitted: true,
      };
    }

    default:
      return state;
  }
}

/* =============================
  🔹 CompensationPage 
============================= */
export default function CompensationPage() {
  // ✅ 상태 정의
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provoide_rate: false,
  });

  const [hasTypeError1, setHasTypeError1] = useState(false); // value1 관련 에러
  const [hasTypeError2, setHasTypeError2] = useState(false); // value2 관련 에러

  const [newGradeSelections, setNewGradeSelections] = useState({}); // NEW 행의 드롭다운 선택 값

  // ✅ 커밋 시 초기화
  useEffect(() => {
    if (state.isCommitted) {
      setErrorState({
        eval_annual_salary_increment: false,
        eval_perform_provoide_rate: false,
      });
      setHasTypeError1(false);
      setHasTypeError2(false);
    }
  }, [state.isCommitted]);

  // ✅ 테이블 입력값 유효성 검사
  const validateTable = (nextData, key) => {
    const hasInvalid = Object.values(nextData).some((ranks) =>
      Object.values(ranks).some((values) => {
        const value = values[key];
        return typeof value === 'string' || value === '' || Number.isNaN(value);
      }),
    );
    if (key === 'value1') setHasTypeError1(hasInvalid);
    else if (key === 'value2') setHasTypeError2(hasInvalid);
  };

  // ✅ 셀 값 변경 시 핸들러
  const handleInputChange = (grade, rank, key, e) => {
    const input = e.target.value.trim();
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const nextValue = isValidNumber ? Number(input) : input;

    const nextRankRate = {
      ...state.rankRate,
      [grade]: {
        ...state.rankRate[grade],
        [rank]: {
          ...state.rankRate[grade][rank],
          [key]: nextValue,
        },
      },
    };

    dispatch({
      type: 'changeRankRate',
      payload: {
        grade,
        rank,
        key,
        value: nextValue,
      },
    });

    validateTable(nextRankRate, key);
  };

  // ✅ 연봉/성과금 가산률 입력 변경
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

  // ✅ 행 추가 시
  const handleAddGradeRow = () => {
    const newGrade = `NEW${Object.keys(state.rankRate).length + 1}`;
    dispatch({
      type: 'addGradeRow',
      payload: { grade: newGrade },
    });

    const nextData = {
      ...state.rankRate,
      [newGrade]: {
        S: { value1: '', value2: '' },
        A: { value1: '', value2: '' },
        BPlus: { value1: '', value2: '' },
        B: { value1: '', value2: '' },
        C: { value1: '', value2: '' },
        D: { value1: '', value2: '' },
      },
    };
    validateTable(nextData, 'value1');
    validateTable(nextData, 'value2');
  };

  // ✅ 에러 상태 계산 : 에러 하나라도 있으면 저장 불가
  const hasAnyError =
    hasTypeError1 ||
    hasTypeError2 ||
    errorState.eval_annual_salary_increment ||
    errorState.eval_perform_provoide_rate;

  // ✅ 커밋 처리 로직
  const handleCommit = () => {
    if (hasAnyError) {
      return; // 에러 있을 경우 저장 무시
    }

    const updatedRankRate = { ...state.rankRate };

    // NEW → 선택된 grade로 변환 + 덮어쓰기
    Object.entries(updatedRankRate).forEach(([grade, ranks]) => {
      if (grade.startsWith('NEW')) {
        const selected = newGradeSelections[grade];
        if (selected) {
          updatedRankRate[selected] = ranks; // 덮어쓰기
          delete updatedRankRate[grade];
        }
      }
    });

    dispatch({
      type: 'commit',
      payload: { updatedRankRate },
    });

    setNewGradeSelections({});
  };

  // ✅ UI 렌더링
  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="payband"
      stepPaths={['기준 설정', '보상지급률 설정']}
      onCommit={handleCommit}
      onRollback={() => {
        dispatch({ type: 'rollback' });
        setNewGradeSelections({});
      }}
      isCommitted={state.isCommitted}
    >
      <div className={styles.container}>
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
          hasTypeError={hasTypeError1}
          newGradeSelections={newGradeSelections}
          onSelectGrade={(gradeKey, selected) =>
            setNewGradeSelections((prev) => ({
              ...prev,
              [gradeKey]: selected,
            }))
          }
        />

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
          hasTypeError={hasTypeError2}
          newGradeSelections={newGradeSelections}
          onSelectGrade={(gradeKey, selected) =>
            setNewGradeSelections((prev) => ({
              ...prev,
              [gradeKey]: selected,
            }))
          }
        />
      </div>
    </AdjustEditLayout>
  );
}
