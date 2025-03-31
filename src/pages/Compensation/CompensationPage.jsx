import { useReducer, useState, useEffect } from 'react';

import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './compensation-page.module.css';
import CompensationSection from './CompensationSection';

/* =============================
  🔹 초기 더미 데이터 정의
============================= */
const selectedTargetGrades = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
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

/* =============================
  🔹 상태 초기값 정의
============================= */
const initialState = {
  rankRate: initialRankRate,
  adjInfo: initialAdjInfo,
  backup: {
    rankRate: JSON.parse(JSON.stringify(initialRankRate)),
    adjInfo: JSON.parse(JSON.stringify(initialAdjInfo)),
  },
  isCommitted: true,
  checkedRows: {},
  pendingDeleteRows: [],
};

/* =============================
  🔹 상태 관리용 Reducer
============================= */
function reducer(state, action) {
  switch (action.type) {
    case 'ChangeRankRate': {
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
        isCommitted: false,
      };
    }

    case 'ChangeAllRankRate': {
      const { updatedRankRate } = action.payload;
      return {
        ...state,
        rankRate: updatedRankRate,
        isCommitted: false,
      };
    }

    case 'ChangeAdjInfo': {
      const { key, value } = action.payload;
      return {
        ...state,
        adjInfo: {
          ...state.adjInfo,
          [key]: value,
        },
        isCommitted: false,
      };
    }

    case 'ChangeCheckedRows': {
      const { updatedCheckedRows } = action.payload;
      return {
        ...state,
        checkedRows: updatedCheckedRows,
        isCommitted: false,
      };
    }

    case 'AddGradeRow': {
      const { grade } = action.payload;
      const newRanks = {
        S: { incrementRate: '', provideRate: '' },
        A: { incrementRate: '', provideRate: '' },
        BPlus: { incrementRate: '', provideRate: '' },
        B: { incrementRate: '', provideRate: '' },
        C: { incrementRate: '', provideRate: '' },
        D: { incrementRate: '', provideRate: '' },
      };
      return {
        ...state,
        rankRate: {
          ...state.rankRate,
          [grade]: newRanks,
        },
        isCommitted: false,
      };
    }

    case 'MarkRowsForDeletion': {
      const { rowsToDelete } = action.payload;
      return {
        ...state,
        pendingDeleteRows: rowsToDelete,
        isCommitted: false,
      };
    }

    case 'Commit': {
      const { updatedRankRate } = action.payload;
      const cleaned = { ...updatedRankRate };
      state.pendingDeleteRows.forEach((delGrade) => {
        delete cleaned[delGrade];
      });

      return {
        ...state,
        rankRate: cleaned,
        backup: {
          rankRate: JSON.parse(JSON.stringify(cleaned)),
          adjInfo: JSON.parse(JSON.stringify(state.adjInfo)),
        },
        isCommitted: true,
        pendingDeleteRows: [],
        checkedRows: {},
      };
    }

    case 'Rollback': {
      return {
        ...state,
        rankRate: state.backup?.rankRate || state.rankRate,
        adjInfo: state.backup?.adjInfo || state.adjInfo,
        checkedRows: {},
        pendingDeleteRows: [],
        isCommitted: true,
      };
    }

    default:
      return state;
  }
}

/* =============================
  🔹 CompensationPage 
============================= */
export default function CompensationPage() {
  // ✅ 상태 정의
  const [state, dispatch] = useReducer(reducer, initialState);

  // 상단 입력 필드의 유효성 상태
  const [errorState, setErrorState] = useState({
    eval_annual_salary_increment: false,
    eval_perform_provoide_rate: false,
  });

  // 테이블 숫자 형식 유효성 오류 상태
  const [hasTypeError1, setHasTypeError1] = useState(false); // incrementRate 관련 에러
  const [hasTypeError2, setHasTypeError2] = useState(false); // provideRate 관련 에러

  // NEW 행의 키값을 추적하는 Set
  const [newGradeSelections, setNewGradeSelections] = useState({});

  // 모든 대상자 직급에 대해 설정이 완료되지 않았을 경우 표시할 경고 상태
  const [newRowKeys, setNewRowKeys] = useState(new Set());

  // 모든 대상자 직급에 대해 설정이 완료되지 않았을 경우 표시할 경고 상태
  const [showGradeMissingWarning, setShowGradeMissingWarning] = useState(false);

  // 드롭다운에 표시할 직급 목록 계산
  const usedGrades = Object.keys(state.rankRate).filter(
    (grade) => !newRowKeys.has(grade),
  ); // 기존에 설정된 직급 (NEW 행 제외)

  // NEW 행에서 선택된 직급
  const selectedGrades = Object.values(newGradeSelections);

  // 드롭다운에서 선택 가능한 직급: 대상자 목록 중 아직 선택되지 않은 항목
  const availableGradeOptions = selectedTargetGrades.filter(
    (grade) => !usedGrades.includes(grade) && !selectedGrades.includes(grade),
  );

  // ✅ 커밋 시 초기화
  useEffect(() => {
    if (state.isCommitted) {
      setErrorState({
        eval_annual_salary_increment: false,
        eval_perform_provoide_rate: false,
      });
      setHasTypeError1(false);
      setHasTypeError2(false);
      setNewRowKeys(new Set());
    }
  }, [state.isCommitted]);

  // ✅ 드롭다운 선택만으로도 경고 메시지 자동 제거
  useEffect(() => {
    const configuredGrades = Object.keys(state.rankRate).filter(
      (grade) => !newRowKeys.has(grade),
    );

    const selectedDropdownGrades = Object.values(newGradeSelections);
    const allConfigured = [...configuredGrades, ...selectedDropdownGrades];

    const isAllTargetGradesConfigured = selectedTargetGrades.every(
      (targetGrade) => allConfigured.includes(targetGrade),
    );

    if (isAllTargetGradesConfigured) {
      setShowGradeMissingWarning(false);
    }
  }, [state.rankRate, newGradeSelections, newRowKeys]);

  // ✅ 테이블 입력값 유효성 검사
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

  // ✅ 셀 값 변경 시 핸들러
  const handleInputChange = (grade, rank, key, e) => {
    const input = e.target.value.trim();
    const isValidNumber = /^-?\d+(\.\d+)?$/.test(input);
    const nextValue = isValidNumber ? Number(input) : input;

    const nextRankRate = {
      ...state.rankRate,
      [grade]: {
        ...state.rankRate[grade],
        [rank]: {
          ...state.rankRate[grade][rank],
          [key]: nextValue,
        },
      },
    };

    dispatch({
      type: 'ChangeRankRate',
      payload: {
        grade,
        rank,
        key,
        value: nextValue,
      },
    });

    validateTable(nextRankRate, key);
  };

  // ✅ 연봉/성과금 가산률 입력 변경
  const handleAdjustmentChange = (key, e) => {
    const isValid =
      /^-?\d*(\.\d+)?$/.test(e.target.value.trim()) &&
      e.target.value.trim() !== '';

    dispatch({
      type: 'ChangeAdjInfo',
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

  // ✅ 행 추가 시
  const handleAddGradeRow = () => {
    const newKey = `temp-${Date.now()}`;

    setNewRowKeys((prev) => new Set(prev).add(newKey));

    dispatch({
      type: 'AddGradeRow',
      payload: { grade: newKey },
    });

    const nextData = {
      ...state.rankRate,
      [newKey]: {
        S: { incrementRate: '', provideRate: '' },
        A: { incrementRate: '', provideRate: '' },
        'B+': { incrementRate: '', provideRate: '' },
        B: { incrementRate: '', provideRate: '' },
        C: { incrementRate: '', provideRate: '' },
        D: { incrementRate: '', provideRate: '' },
      },
    };
    validateTable(nextData, 'incrementRate');
    validateTable(nextData, 'provideRate');
  };

  // ✅ 행 삭제시
  const handleDeleteCheckedRows = () => {
    const rowsToDelete = Object.entries(state.checkedRows)
      .filter(([, checked]) => checked)
      .map(([grade]) => grade);

    const newRows = rowsToDelete.filter((grade) => newRowKeys.has(grade));
    const existingRows = rowsToDelete.filter((grade) => !newRowKeys.has(grade));

    // NEW 행은 즉시 삭제
    const updated = { ...state.rankRate };
    newRows.forEach((grade) => {
      delete updated[grade];
    });

    // 기존 행은 삭제 예약 상태로만
    dispatch({
      type: 'MarkRowsForDeletion',
      payload: { rowsToDelete: existingRows },
    });

    // 체크 상태 업데이트: 삭제된 NEW 행은 체크 해제
    const updatedCheckedRows = { ...state.checkedRows };
    newRows.forEach((grade) => {
      delete updatedCheckedRows[grade];
    });

    // 상태 변경
    dispatch({
      type: 'ChangeAllRankRate',
      payload: { updatedRankRate: updated },
    });

    validateTable(updated, 'incrementRate');
    validateTable(updated, 'provideRate');
  };

  // ✅ 에러 상태 계산 : 에러 하나라도 있으면 저장 불가
  const hasAnyError =
    hasTypeError1 ||
    hasTypeError2 ||
    errorState.eval_annual_salary_increment ||
    errorState.eval_perform_provoide_rate;

  // ✅ 커밋 처리 로직
  const handleCommit = () => {
    if (hasAnyError) {
      return; // 에러 있을 경우 저장 무시
    }

    const updatedRankRate = { ...state.rankRate };

    // 드롭다운 선택값 -> 실제 직급으로 반영
    newRowKeys.forEach((tempKey) => {
      const selected = newGradeSelections[tempKey];
      if (selected) {
        updatedRankRate[selected] = updatedRankRate[tempKey];
        delete updatedRankRate[tempKey];
      }
    });

    // 대상자 직급 누락 여부 확인
    const configuredGrades = Object.keys(updatedRankRate);
    const unconfigured = selectedTargetGrades.filter(
      (grade) => !configuredGrades.includes(grade),
    );

    // 누락된 직급이 있을 경우 저장 중단 + 경고 표시
    if (unconfigured.length > 0) {
      setShowGradeMissingWarning(true);
      return;
    }

    dispatch({
      type: 'Commit',
      payload: { updatedRankRate },
    });

    // 상태 초기화
    setNewGradeSelections({});
    setNewRowKeys(new Set());
    setShowGradeMissingWarning(false);
  };

  // ✅ UI 렌더링
  return (
    <AdjustEditLayout
      prevStepPath="target"
      nextStepPath="payband"
      stepPaths={['기준 설정', '보상지급률 설정']}
      onCommit={handleCommit}
      onRollback={() => {
        dispatch({ type: 'Rollback' });
        setNewGradeSelections({});
        setShowGradeMissingWarning(false);
      }}
      isCommitted={state.isCommitted}
    >
      <div className={styles.container}>
        <CompensationSection
          title="평가차등 연봉인상률 설정"
          description="직급 및 평가등급별 기준연봉 인상률을 설정합니다. 고성과조직 가산 대상은 인상률에 고성과조직 가산률 입력값이 곱해집니다."
          originalValue={state.backup?.adjInfo.eval_annual_salary_increment.toString()}
          value={state.adjInfo.eval_annual_salary_increment.toString()}
          onInputChange={(e) =>
            handleAdjustmentChange('eval_annual_salary_increment', e)
          }
          inputError={errorState.eval_annual_salary_increment}
          tableData={state.rankRate}
          originalTableData={state.backup?.rankRate}
          onTableChange={handleInputChange}
          valueKey="incrementRate"
          onAddGradeRow={handleAddGradeRow}
          hasTypeError={hasTypeError1}
          newGradeSelections={newGradeSelections}
          onSelectGrade={(gradeKey, selected) =>
            setNewGradeSelections((prev) => ({
              ...prev,
              [gradeKey]: selected,
            }))
          }
          checkedRows={state.checkedRows}
          setCheckedRows={(updated) =>
            dispatch({
              type: 'ChangeCheckedRows',
              payload: { updatedCheckedRows: updated },
            })
          }
          onDeleteCheckedRows={handleDeleteCheckedRows}
          isCommitted={state.isCommitted}
          availableGradeOptions={availableGradeOptions}
          pendingDeleteRows={state.pendingDeleteRows}
          isNewRow={(grade) => newRowKeys.has(grade)}
          showGradeMissingWarning={showGradeMissingWarning}
        />

        <CompensationSection
          title="평가차등 경영성과금 지급률 설정"
          description="직급 및 평가등급별 경영성과금 지급 비율을 설정합니다. 고성과조직 가산 대상은 지급률에 고성과조직 가산률 입력값이 더해집니다."
          originalValue={state.backup?.adjInfo.eval_perform_provide_rate.toString()}
          value={state.adjInfo.eval_perform_provide_rate.toString()}
          onInputChange={(e) =>
            handleAdjustmentChange('eval_perform_provide_rate', e)
          }
          inputError={errorState.eval_perform_provide_rate}
          tableData={state.rankRate}
          originalTableData={state.backup?.rankRate}
          onTableChange={handleInputChange}
          valueKey="provideRate"
          onAddGradeRow={handleAddGradeRow}
          hasTypeError={hasTypeError2}
          newGradeSelections={newGradeSelections}
          onSelectGrade={(gradeKey, selected) =>
            setNewGradeSelections((prev) => ({
              ...prev,
              [gradeKey]: selected,
            }))
          }
          checkedRows={state.checkedRows}
          setCheckedRows={(updated) =>
            dispatch({
              type: 'ChangeCheckedRows',
              payload: { updatedCheckedRows: updated },
            })
          }
          onDeleteCheckedRows={handleDeleteCheckedRows}
          isCommitted={state.isCommitted}
          availableGradeOptions={availableGradeOptions}
          pendingDeleteRows={state.pendingDeleteRows}
          isNewRow={(grade) => newRowKeys.has(grade)}
          showGradeMissingWarning={showGradeMissingWarning}
        />
      </div>
    </AdjustEditLayout>
  );
}
