import { useReducer, useMemo, useState, useEffect } from 'react';
import styles from './adj-subject-criteria.module.css';
import DateSelection from './DateSelection';
import GradeSelection from './GradeSelection';
import PaymentSelection from './PaymentSelection';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

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

// 🔧 reducer
function criteriaReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, current: action.payload };
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

export default function AdjSubjectCriteria() {
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
  const handleDateChange = (key, date) => {
    dispatchDate({
      type: 'SET_CURRENT',
      payload: { ...dateState.current, [key]: date },
    });
    dispatchDate({
      type: 'SET_COMMITTED',
      payload: { ...dateState.committed, [key]: false },
    });
  };

  const handleSwitchPaymentChange = (label, isChecked) => {
    const prev = paymentState.current;
    const prevCommitted = paymentState.committed;
    const prevPrevious = paymentState.previous;

    const updated = { ...prev };
    const updatedCommitted = { ...prevCommitted };

    if (label === '전체') {
      const newValue = !prev['전체'];

      Object.keys(prev).forEach((key) => {
        updated[key] = newValue;

        // ✅ 이전 값과 다르면 committed = false
        if (prevPrevious[key] !== newValue) {
          updatedCommitted[key] = false;
        }
      });
    } else {
      updated[label] = isChecked;

      // ✅ 해당 항목 변경되었으면 committed = false
      if (prevPrevious[label] !== isChecked) {
        updatedCommitted[label] = false;
      }

      // ✅ 전체 항목이 다 체크됐는지 확인
      const allChecked = Object.entries(updated)
        .filter(([k]) => k !== '전체')
        .every(([, v]) => v === true);
      updated['전체'] = allChecked;

      // ✅ "전체" 항목의 committed도 상태에 따라 조정
      if (prevPrevious['전체'] !== allChecked) {
        updatedCommitted['전체'] = false;
      }
    }

    dispatchPayment({ type: 'SET_CURRENT', payload: updated });
    dispatchPayment({ type: 'SET_COMMITTED', payload: updatedCommitted });
  };

  const handleSwitchGradeChange = (category, label, isChecked) => {
    const updatedGrades = structuredClone(gradeState.current);
    const updatedCommitted = structuredClone(gradeState.committed);

    if (
      [
        'P직군전체',
        'A직군전체',
        'R직군전체',
        'O직군전체',
        'D직군전체',
        'G직군전체',
      ].includes(label)
    ) {
      const targetCategory = label[0];
      if (updatedGrades[targetCategory]) {
        Object.keys(updatedGrades[targetCategory])
          .filter((key) => !key.includes('직군전체'))
          .forEach((key) => {
            const newVal = isChecked;

            updatedGrades[targetCategory][key] = newVal;

            // ✅ 이전 상태와 다를 때만 committed false 처리
            if (gradeState.previous[targetCategory][key] !== newVal) {
              updatedCommitted[targetCategory][key] = false;
            }
          });
      }

      updatedGrades[category][label] = isChecked;
      updatedCommitted[category][label] = false;
    }

    // 개별 항목 토글 처리
    else if (label === '전체') {
      const allChecked = Object.values(updatedGrades)
        .flatMap((group) => Object.values(group))
        .every((v) => v);
      Object.keys(updatedGrades).forEach((group) => {
        Object.keys(updatedGrades[group]).forEach((key) => {
          const newVal = !allChecked;
          updatedGrades[group][key] = newVal;

          if (gradeState.previous[group]?.[key] !== newVal) {
            updatedCommitted[group][key] = false;
          }
        });
      });
    } else {
      // ✅ 개별 토글
      updatedGrades[category][label] = isChecked;
      if (gradeState.previous[category]?.[label] !== isChecked) {
        updatedCommitted[category][label] = false;
      }

      const allChecked = Object.keys(updatedGrades[category]).every(
        (key) => updatedGrades[category][key],
      );
      const groupLabel = `${category}직군전체`;
      if (['P', 'R', 'A'].includes(category)) {
        updatedGrades.allLeft[groupLabel] = allChecked;

        // ✅ 이전과 달라졌으면 committed = false
        const prevChecked = gradeState.previous.allLeft?.[groupLabel];
        if (prevChecked !== allChecked) {
          updatedCommitted.allLeft[groupLabel] = false;
        }
      } else if (['O', 'D', 'G'].includes(category)) {
        updatedGrades.allRight[groupLabel] = allChecked;
        const prevChecked = gradeState.previous.allRight?.[groupLabel];
        if (prevChecked !== allChecked) {
          updatedCommitted.allRight[groupLabel] = false;
        }
      }
    }

    dispatchGrade({ type: 'SET_CURRENT', payload: updatedGrades });
    dispatchGrade({ type: 'SET_COMMITTED', payload: updatedCommitted });
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

  useEffect(() => {
    console.log('✅ isModified changed:', isModified);
  }, [isModified]);

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
