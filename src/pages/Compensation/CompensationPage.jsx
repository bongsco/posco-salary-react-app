import { useReducer, useState, useEffect } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './compensation-page.module.css';
import CompensationTable from './CompensationTable';
import Input from '#components/Input';

/* 선택된 직급 목록 */
const selectedGrade = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

/* 기본 등급 데이터 (0으로 초기화) */
const defaultRank = {
  S: { incrementRate: 0, provideRate: 0 },
  A: { incrementRate: 0, provideRate: 0 },
  'B+': { incrementRate: 0, provideRate: 0 },
  B: { incrementRate: 0, provideRate: 0 },
  C: { incrementRate: 0, provideRate: 0 },
  D: { incrementRate: 0, provideRate: 0 },
};

/* 초기 데이터 */
const initialRankRate = {
  P3: {
    S: { incrementRate: 0.8, provideRate: 400 },
    A: { incrementRate: 0.8, provideRate: 400 },
    'B+': { incrementRate: 0.8, provideRate: 400 },
    B: { incrementRate: 0.8, provideRate: 400 },
    C: { incrementRate: 0.8, provideRate: 400 },
    D: { incrementRate: 0.8, provideRate: 400 },
  },
  P4: {
    S: { incrementRate: 0.6, provideRate: 350 },
    A: { incrementRate: 0.6, provideRate: 350 },
    'B+': { incrementRate: 0.6, provideRate: 350 },
    B: { incrementRate: 0.6, provideRate: 350 },
    C: { incrementRate: 0.6, provideRate: 350 },
    D: { incrementRate: 0.6, provideRate: 350 },
  },
};

const initialAdjInfo = {
  eval_annual_salary_increment: 0.2,
  eval_perform_provide_rate: 0.3,
};

const initialState = {
  rankRate: initialRankRate,
  adjInfo: initialAdjInfo,
  backup: {
    rankRate: JSON.parse(JSON.stringify(initialRankRate)),
    adjInfo: JSON.parse(JSON.stringify(initialAdjInfo)),
  },
  isCommitted: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ChangeRankRate': {
      const { grade, rank, key, value } = action.payload;
      const updated = {
        ...state.rankRate,
        [grade]: {
          ...state.rankRate[grade],
          [rank]: {
            ...state.rankRate[grade]?.[rank],
            [key]: value,
          },
        },
      };
      return { ...state, rankRate: updated, isCommitted: false };
    }
    case 'ChangeAdjInfo': {
      const { key, value } = action.payload;
      return {
        ...state,
        adjInfo: { ...state.adjInfo, [key]: value },
        isCommitted: false,
      };
    }
    case 'Commit': {
      return {
        ...state,
        backup: {
          rankRate: JSON.parse(JSON.stringify(state.rankRate)),
          adjInfo: JSON.parse(JSON.stringify(state.adjInfo)),
        },
        isCommitted: true,
      };
    }
    case 'Rollback': {
      return {
        ...state,
        rankRate: state.backup.rankRate,
        adjInfo: state.backup.adjInfo,
        isCommitted: true,
      };
    }
    default:
      return state;
  }
}

/* 누락된 직급 및 평가등급을 0으로 채워주는 함수 */
const getDisplayData = (rawData) => {
  return selectedGrade.reduce((acc, grade) => {
    const base = JSON.parse(JSON.stringify(defaultRank));
    const gradeData = rawData[grade] ?? {};

    acc[grade] = Object.fromEntries(
      Object.keys(base).map((rank) => [rank, gradeData[rank] ?? base[rank]]),
    );

    return acc;
  }, {});
};

export default function CompensationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provide_rate: false,
  });

  const [hasTypeError1, setHasTypeError1] = useState(false);
  const [hasTypeError2, setHasTypeError2] = useState(false);

  useEffect(() => {
    if (state.isCommitted) {
      setErrorState({
        eval_annual_salary_increment: false,
        eval_perform_provide_rate: false,
      });
      setHasTypeError1(false);
      setHasTypeError2(false);
    }
  }, [state.isCommitted]);

  const validateTable = (nextData, key) => {
    const hasInvalid = Object.values(nextData).some((ranks) =>
      Object.values(ranks).some((values) => {
        const value = values[key];
        return typeof value === 'string' || value === '' || Number.isNaN(value);
      }),
    );
    if (key === 'incrementRate') setHasTypeError1(hasInvalid);
    else if (key === 'provideRate') setHasTypeError2(hasInvalid);
  };

  const handleInputChange = (grade, rank, key, e) => {
    const input = e.target.value.trim();
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const nextValue = isValidNumber ? Number(input) : input;

    const nextRankRate = {
      ...state.rankRate,
      [grade]: {
        ...state.rankRate[grade],
        [rank]: {
          ...state.rankRate[grade]?.[rank],
          [key]: nextValue,
        },
      },
    };

    dispatch({
      type: 'ChangeRankRate',
      payload: { grade, rank, key, value: nextValue },
    });

    validateTable(nextRankRate, key);
  };

  const handleAdjustmentChange = (key, e) => {
    const trimmed = e.target.value.trim();
    const isValid = /^-?\d*(\.\d+)?$/.test(trimmed) && trimmed !== '';
    const parsedValue = isValid ? Number(trimmed) : trimmed;

    dispatch({
      type: 'ChangeAdjInfo',
      payload: { key, value: parsedValue },
    });

    setErrorState((prev) => ({ ...prev, [key]: !isValid }));
  };

  const handleCommit = () => {
    const hasAnyError =
      hasTypeError1 ||
      hasTypeError2 ||
      errorState.eval_annual_salary_increment ||
      errorState.eval_perform_provide_rate;

    if (hasAnyError) return;
    dispatch({ type: 'Commit' });
  };

  const getInputMode = (original, current, hasError) => {
    if (hasError) return 'error';
    if (typeof original === 'undefined') return 'ok';
    const originalNum = Number(original);
    const currentNum = Number((current ?? '').toString().trim());
    if (Number.isNaN(originalNum) || Number.isNaN(currentNum)) return 'default';
    return originalNum !== currentNum ? 'ok' : 'default';
  };

  const incrementMode = getInputMode(
    state.backup?.adjInfo?.eval_annual_salary_increment ?? 0,
    state.adjInfo?.eval_annual_salary_increment,
    errorState.eval_annual_salary_increment,
  );

  const provideMode = getInputMode(
    state.backup?.adjInfo?.eval_perform_provide_rate ?? 0,
    state.adjInfo?.eval_perform_provide_rate,
    errorState.eval_perform_provide_rate,
  );

  const currentDisplayData = getDisplayData(state.rankRate);
  const originalDisplayData = getDisplayData(state.backup.rankRate);

  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="payband"
      stepPaths={['기준 설정', '보상지급률 설정']}
      onCommit={handleCommit}
      onRollback={() => dispatch({ type: 'Rollback' })}
      isCommitted={state.isCommitted}
    >
      <div className={styles.container}>
        {/* 연봉 인상률 설정 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>평가차등 연봉인상률 설정</h2>
          <p className={styles.description}>
            직급 및 평가등급별 기준연봉 인상률을 설정합니다. 고성과조직 가산
            대상은 인상률에 고성과조직 가산률 입력값이 곱해집니다.
          </p>
          <div className={styles.inputContainer}>
            <span className={styles.inputLabel}>고성과조직 가산률</span>
            <Input
              value={String(state.adjInfo.eval_annual_salary_increment)}
              onChange={(e) =>
                handleAdjustmentChange('eval_annual_salary_increment', e)
              }
              mode={incrementMode}
              customWidth={50}
              customHeight={30}
            />
            <span className={styles.inputLabel}>%</span>
          </div>
          {errorState.eval_annual_salary_increment && (
            <div className={styles.errorMessage}>
              고성과조직 가산률을 입력해 주세요.
            </div>
          )}
          <CompensationTable
            currentData={currentDisplayData}
            originalData={originalDisplayData}
            onChange={handleInputChange}
            valueKey="incrementRate"
            hasTypeError={hasTypeError1}
          />
        </section>

        {/* 성과금 지급률 설정 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            평가차등 경영성과금 지급률 설정
          </h2>
          <p className={styles.description}>
            직급 및 평가등급별 경영성과금 지급 비율을 설정합니다. 고성과조직
            가산 대상은 지급률에 고성과조직 가산률 입력값이 더해집니다.
          </p>
          <div className={styles.inputContainer}>
            <span className={styles.inputLabel}>고성과조직 가산률</span>
            <Input
              value={String(state.adjInfo.eval_perform_provide_rate)}
              onChange={(e) =>
                handleAdjustmentChange('eval_perform_provide_rate', e)
              }
              mode={provideMode}
              customWidth={50}
              customHeight={30}
            />
            <span className={styles.inputLabel}>%</span>
          </div>
          {errorState.eval_perform_provide_rate && (
            <div className={styles.errorMessage}>
              고성과조직 가산률을 입력해 주세요.
            </div>
          )}
          <CompensationTable
            currentData={currentDisplayData}
            originalData={originalDisplayData}
            onChange={handleInputChange}
            valueKey="provideRate"
            hasTypeError={hasTypeError2}
          />
        </section>
      </div>
    </AdjustEditLayout>
  );
}
