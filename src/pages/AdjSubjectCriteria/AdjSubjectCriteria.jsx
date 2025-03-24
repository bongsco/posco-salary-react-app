import { useState, useMemo } from 'react';
import styles from './adj-subject-criteria.module.css';
import DateSelection from './DateSelection';
import GradeSelection from './GradeSelection';
import PaymentSelection from './PaymentSelection';
import AdjustEditLayout from '#layouts/AdjustEditLayout';

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

  const [grades, setGrades] = useState(initialGrades);
  const [prevGrades, setPrevGrades] = useState({ ...initialGrades });

  const [dateValues, setDateValues] = useState(initialDateValues);
  const [previousDateValues, setPreviousDateValues] = useState({
    ...initialDateValues,
  });

  const [payments, setPayments] = useState(initialPayments);
  const [previousPayments, setPreviousPayments] = useState({
    ...initialPayments,
  });

  const [committedPayments, setCommittedPayments] = useState({
    ...initialPayments,
  });
  const [committedGrades, setCommittedGrades] = useState(
    JSON.parse(JSON.stringify(initialGrades)),
  );
  const [committedDates, setCommittedDates] = useState({
    baseDate: false,
    expStartDate: false,
    expEndDate: false,
  });

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const isModified = useMemo(() => {
    const isDateEqual =
      JSON.stringify(dateValues) === JSON.stringify(previousDateValues);
    const isPaymentsEqual =
      JSON.stringify(payments) === JSON.stringify(previousPayments);
    const isGradesEqual = JSON.stringify(grades) === JSON.stringify(prevGrades);
    return !(isDateEqual && isPaymentsEqual && isGradesEqual);
  }, [
    dateValues,
    payments,
    grades,
    previousDateValues,
    previousPayments,
    prevGrades,
  ]);

  const validateForm = () => {
    const hasDateError = Object.values(dateValues).some((v) => v === null);
    const hasPaymentError = Object.values(payments).every((v) => v === false);
    const allGradeValues = Object.values(grades)
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

  const handleSwitchGradeChange = (category, label, isChecked) => {
    setGrades((prev) => {
      const updatedGrades = { ...prev };
      if (label === '전체') {
        const allChecked = Object.values(grades)
          .flatMap((group) => Object.values(group))
          .every((v) => v);
        Object.keys(prev).forEach((group) => {
          updatedGrades[group] = Object.fromEntries(
            Object.keys(prev[group]).map((key) => [key, !allChecked]),
          );
        });
      } else if (
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
          updatedGrades[targetCategory] = Object.fromEntries(
            Object.keys(updatedGrades[targetCategory])
              .filter((key) => !key.includes('직군전체'))
              .map((key) => [key, isChecked]),
          );
        }
        if (category === 'allLeft' || category === 'allRight') {
          updatedGrades[category][label] = isChecked;
        }
      } else {
        updatedGrades[category][label] = isChecked;
        const allChecked = Object.keys(updatedGrades[category]).every(
          (key) => updatedGrades[category][key],
        );
        if (['P', 'R', 'A'].includes(category)) {
          updatedGrades.allLeft[`${category}직군전체`] = allChecked;
        } else if (['O', 'D', 'G'].includes(category)) {
          updatedGrades.allRight[`${category}직군전체`] = allChecked;
        }
      }
      return updatedGrades;
    });
    setCommittedGrades((prev) => {
      const updated = { ...prev };
      if (updated[category]) {
        updated[category][label] = false;
      }
      return updated;
    });
  };

  const handleSwitchPaymentChange = (label, isChecked) => {
    setPayments((prev) => {
      if (label === '전체') {
        const newValue = !prev['전체'];
        const updated = Object.fromEntries(
          Object.keys(prev).map((k) => [k, newValue]),
        );
        return updated;
      }
      if (prev[label] === isChecked) return prev;
      const updated = { ...prev, [label]: isChecked };
      updated['전체'] = Object.entries(updated)
        .filter(([k]) => k !== '전체')
        .every(([, v]) => v);
      return updated;
    });
    setCommittedPayments((prev) => ({
      ...prev,
      [label]: false,
    }));
  };

  const handleDateChange = (key, date) => {
    setDateValues((prev) => {
      if (prev[key] === date) return prev;
      return { ...prev, [key]: date };
    });
    setCommittedDates((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const handleSave = () => {
    setHasTriedSubmit(true);
    if (!formValidation.isValid) return;
    setPreviousDateValues({ ...dateValues });
    setPreviousPayments({ ...payments });
    setPrevGrades({ ...grades });
    setCommittedPayments(
      Object.fromEntries(Object.keys(payments).map((k) => [k, true])),
    );
    // ✅ grades: 모든 항목을 true로 설정
    const committedGradesAllTrue = {};
    Object.keys(grades).forEach((groupKey) => {
      committedGradesAllTrue[groupKey] = {};
      Object.keys(grades[groupKey]).forEach((label) => {
        committedGradesAllTrue[groupKey][label] = true;
      });
    });
    setCommittedGrades(committedGradesAllTrue);
    setCommittedDates({
      baseDate: true,
      expStartDate: true,
      expEndDate: true,
    });
  };

  const handleCancel = () => {
    const restored = JSON.parse(JSON.stringify(prevGrades));
    const syncGroupAllSwitch = (groupKey, allKey) => {
      const group = restored[groupKey];
      const allChecked = Object.values(group).every((v) => v);
      if (restored[allKey] && `${groupKey}직군전체` in restored[allKey]) {
        restored[allKey][`${groupKey}직군전체`] = allChecked;
      }
    };
    ['P', 'R', 'A'].forEach((g) => syncGroupAllSwitch(g, 'allLeft'));
    ['O', 'D', 'G'].forEach((g) => syncGroupAllSwitch(g, 'allRight'));
    const allValues = Object.values(restored)
      .filter((group) => typeof group === 'object')
      .flatMap((group) => Object.values(group));
    const isAllChecked = allValues.every((v) => v === true);
    if (restored.all && '전체' in restored.all) {
      restored.all.전체 = isAllChecked;
    }
    setDateValues({ ...previousDateValues });
    setPayments({ ...previousPayments });
    setGrades(restored);
    setCommittedPayments(
      Object.fromEntries(Object.keys(previousPayments).map((k) => [k, true])),
    );
    setCommittedGrades(JSON.parse(JSON.stringify(prevGrades)));
    setCommittedDates({
      baseDate: true,
      expStartDate: true,
      expEndDate: true,
    });
  };

  return (
    <AdjustEditLayout
      stepPaths={['기준 설정', '대상자 기준 설정']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommited={isModified === false}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <DateSelection
            dateValues={dateValues}
            onChange={handleDateChange}
            committedStates={committedDates}
            hasError={hasTriedSubmit && formValidation.hasDateError}
          />
          <PaymentSelection
            payments={payments}
            onSwitchChange={handleSwitchPaymentChange}
            committedStates={committedPayments}
            hasError={hasTriedSubmit && formValidation.hasPaymentError}
          />
          <GradeSelection
            grades={grades}
            onSwitchChange={handleSwitchGradeChange}
            committedStates={committedGrades}
            hasError={hasTriedSubmit && formValidation.hasGradeError}
          />
        </div>
      </div>
    </AdjustEditLayout>
  );
}
