import { useMemo, useReducer, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import fetchApi from '#utils/fetch';
import DateSelection from './DateSelection';
import GradeSelection from './GradeSelection';
import PaymentSelection from './PaymentSelection';
import styles from './subject-criteria-page.module.css';
import '#styles/global.css';

export default function SubjectCriteriaPage() {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();

  const structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

  const setAllTrue = (obj) => {
    if (typeof obj !== 'object' || obj === null) return true;
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, setAllTrue(v)]),
    );
  };

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
        const newVal = isChecked;

        Object.entries(updated).forEach(([key, val]) => {
          if (key === 'all') return;
          Object.keys(val).forEach((gradeKey) => {
            updated[key][gradeKey] = newVal;
            committed[key][gradeKey] = previous[key][gradeKey] === newVal;
          });
        });

        updated.all = newVal;
        committed.all = previous.all === newVal;
        break;
      }

      case 'TOGGLE_GROUP': {
        Object.keys(updated[category]).forEach((key) => {
          if (key === 'all') return; // 실제 버튼들만 적용
          updated[category][key] = isChecked;
          committed[category][key] = previous[category][key] === isChecked;
        });

        // 직군 전체 토글 상태
        updated[category].all = isChecked;
        committed[category].all = previous[category].all === isChecked;

        // 전체(all) 다시 계산
        const allChecked = Object.entries(updated)
          .filter(([k]) => typeof updated[k] === 'object')
          .flatMap(([, group]) =>
            Object.entries(group)
              .filter(([k]) => k !== 'all')
              .map(([, v]) => v),
          )
          .every((v) => v);

        updated.all = allChecked;
        committed.all = previous.all === allChecked;
        break;
      }

      case 'TOGGLE_SINGLE': {
        updated[category][label] = isChecked;
        committed[category][label] = previous[category][label] === isChecked;

        // 그룹 전체 상태 재계산
        const groupAllChecked = Object.entries(updated[category])
          .filter(([k]) => k !== 'all')
          .every(([, v]) => v);
        updated[category].all = groupAllChecked;
        committed[category].all = previous[category].all === groupAllChecked;

        // 전체도 업데이트
        const allChecked = Object.entries(updated)
          .filter(([k]) => k !== 'all')
          .flatMap(([, group]) =>
            Object.entries(group)
              .filter(([k]) => k !== 'all')
              .map(([, v]) => v),
          )
          .every((v) => v);
        updated.all = allChecked;
        committed.all = previous.all === allChecked;
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

  function makeGradeStructureFromData(grades) {
    const structure = { all: false };

    grades.forEach(({ name, checked }) => {
      const group = name.charAt(0);
      if (!structure[group]) {
        structure[group] = { all: false };
      }
      structure[group][name] = checked;
    });

    // 그룹별 all 계산
    Object.entries(structure).forEach(([group, grade]) => {
      if (group === 'all') return;
      const gradeValues = Object.entries(grade)
        .filter(([k]) => k !== 'all')
        .map(([, v]) => v);
      structure[group].all =
        gradeValues.length > 0 && gradeValues.every(Boolean);
    });

    // 전체 all 계산
    const allChecked = Object.entries(structure)
      .filter(([k]) => k !== 'all')
      .flatMap(([, group]) =>
        Object.entries(group)
          .filter(([k]) => k !== 'all')
          .map(([, v]) => v),
      )
      .every((v) => v === true);

    structure.all = allChecked;

    return structure;
  }

  function criteriaReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
      case 'SET_DATE_VALUE': {
        const { key, value } = payload;
        return {
          ...state,
          current: {
            ...state.current,
            [key]: value,
          },
          committed: {
            ...state.committed,
            [key]: state.previous[key] === value,
          },
        };
      }

      case 'TOGGLE_PAYMENT': {
        const { label, isChecked, isAllToggle } = payload;
        const updated = { ...state.current };
        const committed = { ...state.committed };

        if (isAllToggle) {
          Object.keys(updated).forEach((key) => {
            updated[key] = isChecked;
            committed[key] = state.previous[key] === isChecked;
          });
        } else {
          updated[label] = isChecked;
          committed[label] = state.previous[label] === isChecked;

          const allChecked = Object.entries(updated)
            .filter(([k]) => k !== '전체')
            .every(([, v]) => v === true);

          updated['전체'] = allChecked;
          committed['전체'] = state.previous['전체'] === allChecked;
        }

        return {
          ...state,
          current: updated,
          committed,
        };
      }

      case 'TOGGLE_GRADE':
        return handleGradeToggle(state, payload);

      case 'SET_PREVIOUS':
        return {
          ...state,
          previous: structuredClone(payload),
        };

      case 'SET_COMMITTED':
        return {
          ...state,
          committed: structuredClone(payload),
        };

      case 'MARK_ALL_COMMITTED':
        return {
          ...state,
          committed: setAllTrue(state.current),
        };

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

  const [dateState, dispatchDate] = useReducer(
    criteriaReducer,
    {},
    createInitialState,
  );
  const [paymentState, dispatchPayment] = useReducer(
    criteriaReducer,
    {},
    createInitialState,
  );
  const [gradeState, dispatchGrade] = useReducer(
    criteriaReducer,
    {},
    createInitialState,
  );

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const { data } = useSWR(
    adjust?.adjustId ? `/adjust/${adjust.adjustId}/criteria/subject` : null,

    async (url) => {
      const res = await fetchApi(url);
      if (!res.ok) {
        const errorData = await res.json();

        // 제목 내용 ID
        addError(errorData.status, errorData.message, 'CRITERIA_ERROR');
      }
      return res.json();
    },
    {
      onSuccess: (response) => {
        // 날짜 초기화
        dispatchDate({
          type: 'SET_PREVIOUS',
          payload: {
            baseDate: response.baseDate,
            expStartDate: response.expStartDate,
            expEndDate: response.expEndDate,
          },
        });
        dispatchDate({ type: 'RESET_TO_PREVIOUS' });

        // 직급 초기화 (전체 선택 계산 포함)
        const allChecked = response.payments.every((p) => p.checked);
        const newPayments = {};
        response.payments.forEach((p) => {
          newPayments[p.name] = p.checked;
        });
        newPayments['전체'] = allChecked;

        dispatchPayment({ type: 'SET_PREVIOUS', payload: newPayments });
        dispatchPayment({ type: 'RESET_TO_PREVIOUS' });

        const parsedGrades = makeGradeStructureFromData(response.grades);
        response.grades.forEach(({ name, checked }) => {
          const category = name.charAt(0);
          if (parsedGrades[category]?.[name] !== undefined) {
            parsedGrades[category][name] = checked;
          }
        });

        parsedGrades.all = Object.entries(parsedGrades)
          .filter(([k]) => k !== 'all')
          .flatMap(([, group]) =>
            Object.entries(group)
              .filter(([k]) => k !== 'all')
              .map(([, v]) => v),
          )
          .every((v) => v === true);

        dispatchGrade({ type: 'SET_PREVIOUS', payload: parsedGrades });
        dispatchGrade({ type: 'RESET_TO_PREVIOUS' });
      },
    },
  );

  const isModified = useMemo(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    return !(
      isEqual(dateState.current, dateState.previous) &&
      isEqual(paymentState.current, paymentState.previous) &&
      isEqual(gradeState.current, gradeState.previous)
    );
  }, [dateState, paymentState, gradeState]);

  const validateForm = () => {
    const hasDateError = {
      baseDate: dateState.current.baseDate === null,
      expStartDate: dateState.current.expStartDate === null,
      expEndDate: dateState.current.expEndDate === null,
    };

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
      isValid:
        !hasDateError.baseDate &&
        !hasDateError.expStartDate &&
        !hasDateError.expEndDate &&
        !hasPaymentError &&
        !hasGradeError,
    };
  };

  const formValidation = validateForm();

  const handleDateChange = (key, date) => {
    dispatchDate({
      type: 'SET_DATE_VALUE',
      payload: { key, value: date },
    });
  };

  const handleSwitchPaymentChange = (label, isChecked) => {
    const isAllToggle = label === '전체';
    dispatchPayment({
      type: 'TOGGLE_PAYMENT',
      payload: { label, isChecked, isAllToggle },
    });
  };
  const handleSwitchGradeChange = (category, label, isChecked) => {
    let toggleType = 'TOGGLE_SINGLE';

    if (category === 'all' && label === '전체') {
      toggleType = 'TOGGLE_ALL';
    } else if (label === 'all') {
      toggleType = 'TOGGLE_GROUP';
    }

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

  const handleSave = async () => {
    setHasTriedSubmit(true);
    if (!formValidation.isValid) return;

    try {
      // ✅ gradeSelections: name → id 매핑을 위한 gradeDtos 필요 (data.grades 사용)
      const gradeSelections = {};
      data.grades.forEach(({ id, name }) => {
        const category = name.charAt(0);
        const checked = gradeState.current?.[category]?.[name];
        if (checked !== undefined) {
          gradeSelections[id] = checked;
        }
      });

      // ✅ paymentSelections: name → id 매핑 (data.payments 사용)
      const paymentSelections = {};
      data.payments.forEach(({ id, name }) => {
        if (name === '전체') return; // ❌ 전체는 제외
        const checked = paymentState.current?.[name];
        if (typeof checked === 'boolean') {
          paymentSelections[String(id)] = checked;
        }
      });

      // ✅ PATCH payload 구성
      const patchBody = {
        baseDate: dateState.current.baseDate,
        exceptionStartDate: dateState.current.expStartDate,
        exceptionEndDate: dateState.current.expEndDate,
        gradeSelections,
        paymentSelections,
      };

      // ✅ PATCH 요청
      const res = await fetchApi(
        `/adjust/${adjust.adjustId}/criteria/subject`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patchBody),
        },
      );

      if (!res.ok) {
        throw new Error('PATCH 요청 실패');
      }

      // ✅ 최신 데이터 다시 받아오기
      await mutate('/api/adjust/1/criteria/subject');

      // 성공 시 상태 commit
      dispatchDate({ type: 'SET_PREVIOUS', payload: dateState.current });
      dispatchPayment({ type: 'SET_PREVIOUS', payload: paymentState.current });
      dispatchGrade({ type: 'SET_PREVIOUS', payload: gradeState.current });

      dispatchDate({ type: 'MARK_ALL_COMMITTED' });
      dispatchPayment({ type: 'MARK_ALL_COMMITTED' });
      dispatchGrade({ type: 'MARK_ALL_COMMITTED' });
    } catch (error) {
      addError(error.status, error.message, 'CRITERIA_ERROR');
    }
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
            hasError={
              hasTriedSubmit
                ? formValidation.hasDateError
                : { baseDate: false, expStartDate: false, expEndDate: false }
            }
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
