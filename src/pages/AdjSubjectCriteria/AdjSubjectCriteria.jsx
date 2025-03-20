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

  const handleSwitchChange3 = (category, label, isChecked) => {
    setGrades((prev) => {
      const updatedGrades = { ...prev };

      if (
        label === 'P직군전체' ||
        label === 'A직군전체' ||
        label === 'R직군전체' ||
        label === 'O직군전체' ||
        label === 'D직군전체' ||
        label === 'G직군전체'
      ) {
        // ✅ 해당 직군 전체 값을 선택 또는 해제
        const targetCategory = label[0]; // "P직군전체" -> "P"
        updatedGrades[category][label] = isChecked; // ✅ 전체 버튼도 같이 변경
        updatedGrades[targetCategory] = Object.fromEntries(
          Object.keys(prev[targetCategory]).map((key) => [key, isChecked]),
        );
      } else {
        // ✅ 개별 직급 토글
        updatedGrades[category][label] = isChecked;

        // ✅ 해당 직군의 전체 선택 여부 체크
        const allChecked = Object.values(updatedGrades[category]).every(
          (v) => v,
        );
        if (category in updatedGrades.allLeft)
          updatedGrades.allLeft[`${category}직군전체`] = allChecked;
        if (category in updatedGrades.allRight)
          updatedGrades.allRight[`${category}직군전체`] = allChecked;
      }

      return updatedGrades;
    });

    setIsModified(true);
  };

  // ✅ 현재 상태
  const [dateValues, setDateValues] = useState(initialDateValues);
  const [payments, setPayments] = useState(initialPayments);

  // ✅ 변경 전 상태 저장
  const [previousDateValues, setPreviousDateValues] = useState({
    ...initialDateValues,
  });
  const [previousPayments, setPreviousPayments] = useState({
    ...initialPayments,
  });
  useEffect(() => {
    if (!isModified) {
      setPreviousDateValues({ ...dateValues });
      setPreviousPayments({ ...payments });
      setPrevGrades({ ...grades });
    }
  }, [isFormCommitted]);

  const selectAll = () => {
    // ✅ 현재 모든 값이 true이면 false로, 하나라도 false이면 true로 설정
    const allChecked = Object.values(grades)
      .flatMap((group) => Object.values(group))
      .every((v) => v);

    setGrades((prev) => {
      const updatedGrades = {};
      Object.keys(prev).forEach((category) => {
        updatedGrades[category] = Object.fromEntries(
          Object.keys(prev[category]).map((key) => [key, !allChecked]), // ✅ 전체 상태 반전
        );
      });
      return updatedGrades;
    });

    setIsModified(true);
  };

  // ✅ 스위치 변경 감지 (기존 값과 비교)
  const handleSwitchChange = (label, isChecked) => {
    console.log(`[급여] Switch changed: ${label} → ${isChecked}`);

    setPayments((prev) => {
      // 기존 값과 비교하여 변경이 없으면 상태 업데이트 하지 않음
      if (prev[label] === isChecked) return prev;

      return {
        ...prev,
        [label]: isChecked,
      };
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
    console.log('Saving previous values...', dateValues, payments);
    setPreviousDateValues({ ...dateValues }); // ✅ 최신 값 저장
    setPreviousPayments({ ...payments });
    setPrevGrades({ ...grades });
    setIsModified(false);
    setIsFormCommitted(true);
  };

  // ✅ 취소 (이전 상태로 복원)
  const handleCancel = () => {
    console.log(
      'Restoring previous values...',
      previousDateValues,
      previousPayments,
      prevGrades,
    );

    setDateValues({ ...previousDateValues }); // ✅ 객체를 복사하여 원래 값 복원
    setPayments({ ...previousPayments });
    setGrades({ ...prevGrades });
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
        <PaymentSelection
          payments={payments}
          onSwitchChange={handleSwitchChange}
          isCommitted={isFormCommitted}
        />
        <GradeSelection
          grades={grades}
          onSwitchChange={handleSwitchChange3}
          selectAll={selectAll}
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
