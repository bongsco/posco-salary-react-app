import { useEffect, useReducer, useState } from 'react';
import useSWR from 'swr';
import Input from '#components/Input';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import fetchApi from '#utils/fetch';
import CompensationTable from './PaymentRateTable';
import styles from './payment-rate-criteria-page.module.css';
import '#styles/global.css';
import '#styles/table.css';

const fixedGradeOrder = [
  'A1',
  'A2',
  'A3',
  'D1',
  'D2',
  'D3',
  'E2',
  'E3',
  'E4',
  'E5',
  'E6',
  'G1',
  'G2',
  'G3',
  'O1',
  'O2',
  'O3',
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
  'R1',
  'R2',
  'R3',
];
const fixedRankOrder = ['S', 'A', 'B+', 'B', 'C', 'D'];

const normalizeAndSortRankRate = (rawRankRate) => {
  return fixedGradeOrder.reduce((gradeAcc, grade) => {
    const rankMap = rawRankRate[grade];
    if (!rankMap) return gradeAcc;

    const sortedRanks = fixedRankOrder.reduce((rankAcc, rank) => {
      const values = rankMap[rank];
      if (!values) return rankAcc;

      return {
        ...rankAcc,
        [rank]: {
          incrementRate: values.incrementRate,
          provideRate: values.bonusMultiplier,
        },
      };
    }, {});

    return {
      ...gradeAcc,
      [grade]: sortedRanks,
    };
  }, {});
};

const initialState = {
  rankRate: {},
  adjInfo: {
    eval_annual_salary_increment: 0,
    eval_perform_provide_rate: 0,
  },
  backup: {
    rankRate: {},
    adjInfo: {},
  },
  isCommitted: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'Init': {
      const { rankRate, adjInfo } = action.payload;
      return {
        rankRate,
        adjInfo,
        backup: {
          rankRate: JSON.parse(JSON.stringify(rankRate)),
          adjInfo: JSON.parse(JSON.stringify(adjInfo)),
        },
        isCommitted: true,
      };
    }
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

export default function PaymentRateCriteriaPage() {
  const { adjust } = useAdjustContext();
  const adjustId = adjust?.adjustId;
  const { addError } = useErrorHandlerContext();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provide_rate: false,
  });
  const [hasIncrementRateError, setHasIncrementRateError] = useState(false);
  const [hasProvideRateError, setHasProvideRateError] = useState(false);

  const fetcher = async (url) => {
    const res = await fetchApi(url);
    if (!res.ok) {
      addError(
        `연봉지급률 조회 실패 (${res.status} ${res.statusText})`,
        '조정 ID 또는 서버 응답을 확인해주세요.',
        'PAYMENT_RATE_FETCH_ERROR',
      );
      throw new Error('Fetch failed');
    }
    const json = await res.json();
    return json.data;
  };

  const { data } = useSWR(
    adjustId ? `/adjust/${adjustId}/criteria/paymentrate` : null,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const sorted = normalizeAndSortRankRate(data.paymentRates);

      dispatch({
        type: 'Init',
        payload: {
          rankRate: sorted,
          adjInfo: {
            eval_annual_salary_increment: data.hpoSalaryIncrementRate,
            eval_perform_provide_rate: data.hpoExtraBonusMultiplier,
          },
        },
      });
    }
  }, [data]);

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
    let hasIncrementError = false;
    let hasProvideError = false;

    Object.values(state.rankRate).forEach((ranks) => {
      Object.values(ranks).forEach(({ incrementRate, provideRate }) => {
        if (Number.isNaN(Number(incrementRate))) hasIncrementError = true;
        if (Number.isNaN(Number(provideRate))) hasProvideError = true;
      });
    });

    setHasIncrementRateError(hasIncrementError);
    setHasProvideRateError(hasProvideError);
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

    dispatch({ type: 'ChangeAdjInfo', payload: { key, value: parsedValue } });
    setErrorState((prev) => ({ ...prev, [key]: !isValid }));
  };

  const saveToServer = async () => {
    const paymentRates = Object.entries(state.rankRate).reduce(
      (acc, [grade, rankMap]) => ({
        ...acc,
        [grade]: Object.entries(rankMap).reduce(
          (rankAcc, [rank, { incrementRate, provideRate }]) => ({
            ...rankAcc,
            [rank]: {
              incrementRate,
              bonusMultiplier: provideRate,
            },
          }),
          {},
        ),
      }),
      {},
    );

    const payload = {
      hpoSalaryIncrementRate: state.adjInfo.eval_annual_salary_increment,
      hpoExtraBonusMultiplier: state.adjInfo.eval_perform_provide_rate,
      paymentRates,
    };

    const res = await fetchApi(`/adjust/${adjustId}/criteria/paymentrate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      addError(
        `연봉지급률 저장 실패 (${res.status})`,
        '서버 오류 또는 유효하지 않은 요청입니다.',
        'PAYMENT_RATE_SAVE_ERROR',
      );
      return;
    }

    dispatch({ type: 'Commit' });
  };

  const handleCommit = async () => {
    const hasAnyError =
      hasIncrementRateError ||
      hasProvideRateError ||
      errorState.eval_annual_salary_increment ||
      errorState.eval_perform_provide_rate;

    if (hasAnyError) return;

    await saveToServer();
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
            currentData={state.rankRate}
            originalData={state.backup.rankRate}
            onChange={handleInputChange}
            valueKey="incrementRate"
            hasError={hasIncrementRateError}
          />
        </section>

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
            currentData={state.rankRate}
            originalData={state.backup.rankRate}
            onChange={handleInputChange}
            valueKey="provideRate"
            hasError={hasProvideRateError}
          />
        </section>
      </div>
    </AdjustEditLayout>
  );
}
