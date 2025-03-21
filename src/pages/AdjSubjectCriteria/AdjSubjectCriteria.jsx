import { useState, useEffect } from 'react';
import BreadCrumbs from '#components/BreadCrumbs';
import styles from './adj-subject-criteria.module.css';
import DateSelection from './DateSelection';
import GradeSelection from './GradeSelection';
import Button from '#components/Button';
import PaymentSelection from './PaymentSelection';

export default function AdjSubjectCriteria() {
  const items = ['연봉조정', '등록'];
  const [isFormCommitted, setIsFormCommitted] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // ✅ 초기 상태 저장 (복구용)
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
  // ✅ 하나의 객체로 통합하여 기존 구조 유지
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

  useEffect(() => {
    if (!isModified) {
      console.log('📦 Restored (after cancel):', payments, grades);
    }
  }, [payments, grades, isModified]);

  // ----------------------------------handle function----------------------------------
  const handleSwitchGradeChange = (category, label, isChecked) => {
    setGrades((prev) => {
      const updatedGrades = { ...prev };
      if (label === '전체') {
        // ✅ "전체" 버튼 클릭 시 모든 값 토글
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
        const targetCategory = label[0]; // 예: "P직군전체" → "P"

        if (updatedGrades[targetCategory]) {
          updatedGrades[targetCategory] = Object.fromEntries(
            Object.keys(updatedGrades[targetCategory])
              .filter((key) => !key.includes('직군전체')) // 전체 버튼 제외
              .map((key) => [key, isChecked]),
          );
        }
        if (category === 'allLeft' || category === 'allRight') {
          updatedGrades[category][label] = isChecked;
        }
      } else {
        updatedGrades[category][label] = isChecked;

        // ✅ 해당 직군의 전체 선택 여부 체크
        const allChecked = Object.keys(updatedGrades[category]).every(
          (key) => updatedGrades[category][key],
        );

        // ✅ 직군에 따라 allLeft or allRight 쪽 전체 버튼 상태 갱신
        if (['P', 'R', 'A'].includes(category)) {
          updatedGrades.allLeft[`${category}직군전체`] = allChecked;
        } else if (['O', 'D', 'G'].includes(category)) {
          updatedGrades.allRight[`${category}직군전체`] = allChecked;
        }
      }

      return updatedGrades;
    });

    setIsModified(true);
  };

  // ✅ 스위치 변경 감지 (기존 값과 비교)
  const handleSwitchPaymentChange = (label, isChecked) => {
    setPayments((prev) => {
      // "전체" 버튼이 눌렸을 경우 모든 값을 변경
      if (label === '전체') {
        const newValue = !prev['전체']; // 전체 버튼의 상태를 토글
        const updatedPayments = Object.keys(prev).reduce((acc, key) => {
          acc[key] = newValue;
          return acc;
        }, {});
        return updatedPayments;
      }

      // 기존 값과 비교하여 변경이 없으면 상태 업데이트 하지 않음
      if (prev[label] === isChecked) return prev;

      const updatedState = {
        ...prev,
        [label]: isChecked,
      };

      // 전체 체크 상태를 개별 항목에 따라 동기화
      const allChecked = Object.keys(updatedState).every(
        (key) => key === '전체' || updatedState[key],
      );

      updatedState['전체'] = allChecked;

      return updatedState;
    });

    setIsModified(true);
  };

  // ✅ 날짜 변경 감지 (기존 값과 비교)
  const handleDateChange = (key, date) => {
    setDateValues((prev) => {
      // 기존 값과 비교하여 변경이 없으면 상태 업데이트 하지 않음
      if (prev[key] === date) return prev;

      return {
        ...prev,
        [key]: date,
      };
    });

    setIsModified(true);
  };
  // ✅ 저장 (변경된 값 유지 & 취소 버튼을 눌러도 복구되지 않도록 현재 값을 저장)
  const handleSave = () => {
    setPreviousDateValues({ ...dateValues }); // ✅ 최신 값 저장
    setPreviousPayments({ ...payments });
    setPrevGrades({ ...grades });
    setIsModified(false);
    setIsFormCommitted(true);
  };

  const handleCancel = () => {
    const restored = JSON.parse(JSON.stringify(prevGrades)); // 깊은 복사

    const syncGroupAllSwitch = (groupKey, allKey) => {
      const group = restored[groupKey];
      const allChecked = Object.values(group).every((v) => v);

      if (restored[allKey] && `${groupKey}직군전체` in restored[allKey]) {
        restored[allKey][`${groupKey}직군전체`] = allChecked;
      }
    };

    // ✅ 각 직군 전체 버튼 동기화
    ['P', 'R', 'A'].forEach((g) => syncGroupAllSwitch(g, 'allLeft'));
    ['O', 'D', 'G'].forEach((g) => syncGroupAllSwitch(g, 'allRight'));

    // ✅ 전체 버튼 동기화
    const allValues = Object.values(restored)
      .filter((group) => typeof group === 'object')
      .flatMap((group) => Object.values(group));

    const isAllChecked = allValues.every((v) => v === true);
    if (restored.all && '전체' in restored.all) {
      restored.all.전체 = isAllChecked;
    }

    // ✅ 상태 복원
    setDateValues({ ...previousDateValues });
    setPayments({ ...previousPayments });
    setGrades(restored);
    setIsModified(false);
  };

  return (
    <div className={styles.contentWrapper}>
      <BreadCrumbs items={items} />
      <div className={styles.titleWrapper}>
        <div className={styles.title}>대상자 기준 설정</div>
        {(isModified || isFormCommitted) && (
          <div className={styles.savedWrapper}>
            <Button
              label="저장"
              size="xsmall"
              variant="primary"
              onClick={handleSave}
            />
            {isModified && (
              <Button
                label="취소"
                size="xsmall"
                variant="secondary"
                onClick={handleCancel}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <DateSelection
          dateValues={dateValues}
          onChange={handleDateChange}
          isSaved={isFormCommitted}
        />
        {/* ✅ 급여기준 */}
        <PaymentSelection
          payments={payments}
          onSwitchChange={handleSwitchPaymentChange}
          isCommitted={isFormCommitted}
        />
        {/* ✅ 직급 */}
        <GradeSelection
          grades={grades}
          onSwitchChange={handleSwitchGradeChange}
          isCommitted={isFormCommitted}
        />
      </div>
      <div className={styles.separator} />
      <div className={styles.buttonWrapper}>
        <Button className={styles.button} label="이전 단계" size="small" />
        <Button className={styles.button} label="다음 단계" size="small" />
      </div>
    </div>
  );
}
