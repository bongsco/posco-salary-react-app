import { useReducer, useState } from 'react';
import Input from '#components/Input';
import CompensationTable from './CompensationTable';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './compensation-page.module.css';

const initialRankRate = {
  P3: {
    S: { value1: '0.8%', value2: '400%' },
    A: { value1: '0.8%', value2: '400%' },
    BPlus: { value1: '0.8%', value2: '400%' },
    B: { value1: '0.8%', value2: '400%' },
    C: { value1: '0.8%', value2: '400%' },
    D: { value1: '0.8%', value2: '400%' },
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
  isCommited: true,
};

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
        isCommited: false,
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
        isCommited: false,
      };
    }
    case 'commit': {
      return {
        ...state,
        backup: {
          rankRate: JSON.parse(JSON.stringify(state.rankRate)),
          adjInfo: JSON.parse(JSON.stringify(state.adjInfo)),
        },
        isCommited: true,
      };
    }
    case 'rollback': {
      return {
        ...state,
        rankRate: state.backup?.rankRate || state.rankRate,
        adjInfo: state.backup?.adjInfo || state.adjInfo,
        isCommited: true,
      };
    }
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

  const handleInputChange = (grade, rank, key, e) => {
    dispatch({
      type: 'changeRankRate',
      payload: {
        grade,
        rank,
        key,
        value: e.target.value,
      },
    });
  };

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

  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="payband"
      stepPaths={['기준 설정', '보상지급률 설정']}
      onCommit={() => dispatch({ type: 'commit' })}
      onRollback={() => dispatch({ type: 'rollback' })}
      isCommited={state.isCommited}
    >
      <div className={styles.container}>
        {/* 1. 평가차등 연봉인상률 설정 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>평가차등 연봉인상률 설정</h2>
          <p className={styles.description}>
            직급 및 평가등급별 기준연봉 인상률을 설정합니다. 고성과조직 가산
            대상은 인상률에 고성과조직 가산률 입력값이 곱해집니다.
          </p>

          <div className={styles.inputContainer}>
            <span className={styles.inputLabel}>고성과조직 가산률</span>
            <Input
              value={state.adjInfo.eval_annual_salary_increment.toString()}
              onChange={(e) =>
                handleAdjustmentChange('eval_annual_salary_increment', e)
              }
              mode={
                errorState.eval_annual_salary_increment ? 'error' : 'default'
              }
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
            originalData={state.backup?.rankRate}
            onChange={handleInputChange}
            valueKey="value1"
          />
        </div>

        {/* 2. 평가차등 경영성과금 지급률 설정 */}
        <div className={styles.section}>
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
              value={state.adjInfo.eval_perform_provide_rate.toString()}
              onChange={(e) =>
                handleAdjustmentChange('eval_perform_provide_rate', e)
              }
              mode={errorState.eval_perform_provide_rate ? 'error' : 'default'}
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
            originalData={state.backup?.rankRate}
            onChange={handleInputChange}
            valueKey="value2"
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
