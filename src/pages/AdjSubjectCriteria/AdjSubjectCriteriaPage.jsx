import { useReducer, useMemo, useState } from 'react';
import styles from './adj-subject-criteria.module.css';
import DateSelection from './DateSelection';
import GradeSelection from './GradeSelection';
import PaymentSelection from './PaymentSelection';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

export default function AdjSubjectCriteriaPage() {
  const initialDateValues = {
    baseDate: null,
    expStartDate: null,
    expEndDate: null,
  };
  const initialPayments = {
    전체: false,
    연봉직: false,
    '비서직(정규)': false,
    '비서직(계약)': false,
    별정직: false,
    계약직: false,
    '임시직(시간)': false,
    '임시직(일)': false,
    임원: false,
  };
  const initialGrades = {
    all: { 전체: false },
    allLeft: { P직군전체: false, R직군전체: false, A직군전체: false },
    allRight: { O직군전체: false, D직군전체: false, G직군전체: false },
    P: { P6: false, P5: false, P4: false, P3: false, P2: false, P1: false },
    R: { R3: false, R2: false, R1: false },
    A: { A3: false, A2: false, A1: false },
    O: { O3: false, O2: false, O1: false },
    D: { D3: false, D2: false, D1: false },
    G: { G3: false, G2: false, G1: false },
  };

  const structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

  const setAllTrue = (obj) => {
    if (typeof obj !== 'object' || obj === null) return true;
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, setAllTrue(v)]),
    );
  };
  // 🔧 상태 생성 유틸
  const createInitialState = (initial) => ({
    current: initial,
    previous: structuredClone(initial),
    committed: setAllTrue(initial),
  });

  function handleGradeToggle(
    state,
    { category, label, isChecked, toggleType },
  ) {
    const updated = structuredClone(state.current);
    const committed = structuredClone(state.committed);
    const { previous } = state;

    switch (toggleType) {
      case 'TOGGLE_ALL': {
        const allChecked = Object.values(updated)
          .flatMap((group) => Object.values(group))
          .every((v) => v);
        Object.entries(updated).forEach(([group, values]) => {
          Object.keys(values).forEach((key) => {
            const newVal = !allChecked;
            updated[group][key] = newVal;
            committed[group][key] = previous[group]?.[key] === newVal;
          });
        });
        break;
      }

      case 'TOGGLE_GROUP': {
        const groupToCategoryMap = {
          P직군전체: 'P',
          R직군전체: 'R',
          A직군전체: 'A',
          O직군전체: 'O',
          D직군전체: 'D',
          G직군전체: 'G',
        };

        const targetCategory = groupToCategoryMap[label];

        Object.keys(updated[targetCategory]).forEach((key) => {
          updated[targetCategory][key] = isChecked;
          committed[targetCategory][key] =
            previous[targetCategory][key] === isChecked;
        });

        updated[category][label] = isChecked;
        committed[category][label] = previous[category]?.[label] === isChecked;
        break;
      }

      case 'TOGGLE_SINGLE': {
        updated[category][label] = isChecked;
        committed[category][label] = previous[category][label] === isChecked;

        const allChecked = Object.values(updated[category]).every((v) => v);
        const groupLabel = `${category}직군전체`;
        const groupKey = ['P', 'R', 'A'].includes(category)
          ? 'allLeft'
          : 'allRight';

        updated[groupKey][groupLabel] = allChecked;
        committed[groupKey][groupLabel] =
          previous[groupKey]?.[groupLabel] === allChecked;

        // ✅ '전체' 버튼 상태도 갱신
        const allValues = Object.values(updated)
          .filter((v) => typeof v === 'object')
          .flatMap((group) => Object.values(group));
        const topLevelAllChecked = allValues.every((v) => v);
        updated.all['전체'] = topLevelAllChecked;
        committed.all['전체'] = previous.all?.['전체'] === topLevelAllChecked;

        break;
      }

      default:
        break;
    }

    return {
      ...state,
      current: updated,
      committed,
    };
  }

  // 🔧 reducer
  function criteriaReducer(state, action) {
    switch (action.type) {
      case 'SET_DATE_VALUE':
        return {
          ...state,
          current: {
            ...state.current,
            [action.payload.key]: action.payload.value,
          },
          committed: {
            ...state.committed,
            [action.payload.key]:
              state.previous[action.payload.key] === action.payload.value,
          },
        };

      case 'TOGGLE_PAYMENT': {
        const { label, isChecked, isAllToggle } = action.payload;
        const updatedPayments = { ...state.current };
        const updatedCommitted = { ...state.committed };

        if (isAllToggle) {
          Object.keys(updatedPayments).forEach((key) => {
            updatedPayments[key] = isChecked;
            updatedCommitted[key] = state.previous[key] === isChecked;
          });
        } else {
          updatedPayments[label] = isChecked;
          updatedCommitted[label] = state.previous[label] === isChecked;

          const allChecked = Object.entries(updatedPayments)
            .filter(([k]) => k !== '전체')
            .every(([, v]) => v === true);
          updatedPayments['전체'] = allChecked;
          updatedCommitted['전체'] = state.previous['전체'] === allChecked;
        }

        return {
          ...state,
          current: updatedPayments,
          committed: updatedCommitted,
        };
      }

      case 'TOGGLE_GRADE':
        return handleGradeToggle(state, action.payload); // 외부 함수 분리 처리

      // 나머지 기본 액션들
      case 'SET_PREVIOUS':
        return { ...state, previous: structuredClone(action.payload) };
      case 'SET_COMMITTED':
        return { ...state, committed: structuredClone(action.payload) };
      case 'MARK_ALL_COMMITTED':
        return { ...state, committed: setAllTrue(state.current) };
      case 'RESET_TO_PREVIOUS':
        return {
          ...state,
          current: structuredClone(state.previous),
          committed: setAllTrue(state.previous),
        };
      default:
        return state;
    }
  }

  // useReducer
  const [dateState, dispatchDate] = useReducer(
    criteriaReducer,
    initialDateValues,
    createInitialState,
  );
  const [paymentState, dispatchPayment] = useReducer(
    criteriaReducer,
    initialPayments,
    createInitialState,
  );
  const [gradeState, dispatchGrade] = useReducer(
    criteriaReducer,
    initialGrades,
    createInitialState,
  );

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const isModified = useMemo(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    return !(
      isEqual(dateState.current, dateState.previous) &&
      isEqual(paymentState.current, paymentState.previous) &&
      isEqual(gradeState.current, gradeState.previous)
    );
  }, [dateState, paymentState, gradeState]);

  const validateForm = () => {
    const hasDateError = Object.values(dateState.current).some(
      (v) => v === null,
    );
    const hasPaymentError = Object.values(paymentState.current).every(
      (v) => v === false,
    );
    const allGradeValues = Object.values(gradeState.current)
      .filter((group) => typeof group === 'object')
      .flatMap((group) => Object.values(group));
    const hasGradeError = allGradeValues.every((v) => v === false);
    return {
      hasDateError,
      hasPaymentError,
      hasGradeError,
      isValid: !hasDateError && !hasPaymentError && !hasGradeError,
    };
  };

  const formValidation = validateForm();

  // ✅ 핸들러들
  // ✅ 날짜
  const handleDateChange = (key, date) => {
    dispatchDate({
      type: 'SET_DATE_VALUE',
      payload: { key, value: date },
    });
  };

  // ✅ 연봉직
  const handleSwitchPaymentChange = (label, isChecked) => {
    const isAllToggle = label === '전체';
    dispatchPayment({
      type: 'TOGGLE_PAYMENT',
      payload: { label, isChecked, isAllToggle },
    });
  };

  // ✅ 직급
  const handleSwitchGradeChange = (category, label, isChecked) => {
    let toggleType = 'TOGGLE_SINGLE';
    if (label === '전체') toggleType = 'TOGGLE_ALL';
    else if (label.includes('직군전체')) toggleType = 'TOGGLE_GROUP';

    dispatchGrade({
      type: 'TOGGLE_GRADE',
      payload: {
        category,
        label,
        isChecked,
        toggleType,
      },
    });
  };

  const handleSave = () => {
    setHasTriedSubmit(true);
    if (!formValidation.isValid) return;

    dispatchDate({ type: 'SET_PREVIOUS', payload: dateState.current });
    dispatchPayment({ type: 'SET_PREVIOUS', payload: paymentState.current });
    dispatchGrade({ type: 'SET_PREVIOUS', payload: gradeState.current });

    dispatchDate({ type: 'MARK_ALL_COMMITTED' });
    dispatchPayment({ type: 'MARK_ALL_COMMITTED' });
    dispatchGrade({ type: 'MARK_ALL_COMMITTED' });
  };

  const handleCancel = () => {
    dispatchDate({ type: 'RESET_TO_PREVIOUS' });
    dispatchPayment({ type: 'RESET_TO_PREVIOUS' });
    dispatchGrade({ type: 'RESET_TO_PREVIOUS' });
  };

  return (
    <AdjustEditLayout
      stepPaths={['기준 설정', '대상자 기준 설정']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommitted={!isModified}
      nextStepPath="payment-rate"
    >
      <div>
        <div className={styles.content}>
          <DateSelection
            dateValues={dateState.current}
            onChange={handleDateChange}
            committedStates={dateState.committed}
            hasError={hasTriedSubmit && formValidation.hasDateError}
          />
          <PaymentSelection
            payments={paymentState.current}
            onSwitchChange={handleSwitchPaymentChange}
            committedStates={paymentState.committed}
            hasError={hasTriedSubmit && formValidation.hasPaymentError}
          />
          <GradeSelection
            grades={gradeState.current}
            onSwitchChange={handleSwitchGradeChange}
            committedStates={gradeState.committed}
            hasError={hasTriedSubmit && formValidation.hasGradeError}
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
