import { useEffect, useReducer, useState } from 'react';
import Input from '#components/Input';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import CompensationTable from './PaymentRateTable';
import styles from './payment-rate-criteria-page.module.css';
import '#styles/global.css';
import '#styles/table.css';

const selectedGrade = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

const defaultRank = {
  S: { incrementRate: 5.0, provideRate: 400 },
  A: { incrementRate: 4.5, provideRate: 350 },
  'B+': { incrementRate: 4.2, provideRate: 300 },
  B: { incrementRate: 3.7, provideRate: 250 },
  C: { incrementRate: 3.2, provideRate: 200 },
  D: { incrementRate: 2.7, provideRate: 150 },
};

// TODO: 초깃값 설정 방식 개선 필요
const initialRankRate = {};

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

      const existingGrade = state.rankRate[grade] ?? {};
      const existingRank = existingGrade[rank] ?? {
        incrementRate: 0,
        provideRate: 0,
      };

      return {
        ...state,
        rankRate: {
          ...state.rankRate,
          [grade]: {
            ...existingGrade,
            [rank]: {
              ...existingRank,
              [key]: value,
            },
          },
        },
        isCommitted: false,
      };
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

export default function PaymentRateCriteriaPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provide_rate: false,
  });

  const [hasIncrementRateError, setHasIncrementRateError] = useState(false);
  const [hasProvideRateError, setHasProvideRateError] = useState(false);

  const validateTable = (data) => {
    let hasIncrementError = false;
    let hasProvideError = false;

    Object.values(data).forEach((ranks) => {
      Object.values(ranks).forEach((values) => {
        const { incrementRate, provideRate } = values;

        const incInvalid =
          incrementRate === undefined ||
          incrementRate === '' ||
          typeof incrementRate === 'string' ||
          Number.isNaN(Number(incrementRate));

        const provInvalid =
          provideRate === undefined ||
          provideRate === '' ||
          typeof provideRate === 'string' ||
          Number.isNaN(Number(provideRate));

        if (incInvalid) hasIncrementError = true;
        if (provInvalid) hasProvideError = true;
      });
    });

    setHasIncrementRateError(hasIncrementError);
    setHasProvideRateError(hasProvideError);
  };

  useEffect(() => {
    if (state.isCommitted) {
      setErrorState({
        eval_annual_salary_increment: false,
        eval_perform_provide_rate: false,
      });
      setHasIncrementRateError(false);
      setHasProvideRateError(false);
    }
  }, [state.isCommitted]);

  useEffect(() => {
    validateTable(state.rankRate);
  }, [state.rankRate]);

  const handleInputChange = (grade, rank, key, e) => {
    const input = e.target.value.trim();
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const nextValue = isValidNumber ? Number(input) : input;

    dispatch({
      type: 'ChangeRankRate',
      payload: { grade, rank, key, value: nextValue },
    });
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
      hasIncrementRateError ||
      hasProvideRateError ||
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
      prevStepPath="subject"
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
            hasError={hasIncrementRateError}
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
            hasError={hasProvideRateError}
          />
        </section>
      </div>
    </AdjustEditLayout>
  );
}
