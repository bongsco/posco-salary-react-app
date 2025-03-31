import { useState, useMemo, useRef, useReducer } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import CheckBox from '#components/CheckBox/CheckBox';
import PaybandTableRow from './PaybandTableRow';
import styles from './payband-config-page.module.css';
import '../../styles/table.css';
import Button from '#components/Button';

export default function PaybandConfigPage() {
  const [receivedPayband, setReceivedPayband] = useState([
    {
      id: 1,
      grade: 'P3',
      upperBound: 70,
      lowerBound: 30,
      modified: [],
      error: [],
      isChecked: false,
      isNewRow: false,
    },
    {
      id: 2,
      grade: 'P1',
      upperBound: 170,
      lowerBound: 20,
      modified: [],
      error: [],
      isChecked: false,
      isNewRow: false,
    },
    {
      id: 3,
      grade: 'P2',
      upperBound: 80,
      lowerBound: 10,
      modified: [],
      error: [],
      isChecked: false,
      isNewRow: false,
    },
  ]);

  const allGrades = useRef([
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
  ]);

  const [deletedPayband, setDeletedPayband] = useState([]);

  const [duplicated, setDuplicated] = useState(false);

  const hasError = (value) => {
    return (
      value === undefined ||
      String(value).trim() === '' ||
      Number.isNaN(Number(value)) ||
      value < 0 ||
      value > 200
    );
  };

  const addError = (addModified, updatedPayband) => {
    return {
      ...updatedPayband,
      error: updatedPayband.error.includes(addModified)
        ? updatedPayband.error
        : [...updatedPayband.error, addModified],
    };
  };

  const removeError = (addModified, updatedPayband) => {
    return {
      ...updatedPayband,
      error: updatedPayband.error.filter((e) => e !== addModified),
    };
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'updatePayband':
        return action.payload;

      case 'changeAllIsChecked':
        return state.map((pb) => {
          return { ...pb, isChecked: action.payload };
        });

      case 'changeUpperBoundWithIndex': {
        let updatedModified = [...action.payband.modified];

        if (!action.payband.modified.includes('상한')) {
          updatedModified.push('상한');
        } else if (
          action.originItem &&
          action.changedPart === action.originItem.upperBound
        ) {
          updatedModified = updatedModified.filter((m) => m !== '상한');
        }

        let updatedPayband = {
          ...action.payband,
          upperBound: action.changedPart,
          modified: updatedModified,
        };

        if (
          hasError(action.changedPart) ||
          updatedPayband.lowerBound > updatedPayband.upperBound
        ) {
          updatedPayband = addError('상한', updatedPayband);
        } else {
          updatedPayband = removeError('상한', updatedPayband);
          if (
            updatedPayband.error.includes('하한') &&
            !hasError(updatedPayband.lowerBound)
          ) {
            updatedPayband = removeError('하한', updatedPayband);
          }
        }
        return state.map((pb, i) => (i === action.idx ? updatedPayband : pb));
      }

      case 'changeLowerBoundWithIndex': {
        let updatedModified = [...action.payband.modified];

        if (!action.payband.modified.includes('하한')) {
          updatedModified.push('하한');
        } else if (
          action.originItem &&
          action.changedPart === action.originItem.lowerBound
        ) {
          updatedModified = updatedModified.filter((m) => m !== '하한');
        }

        let updatedPayband = {
          ...action.payband,
          lowerBound: action.changedPart,
          modified: updatedModified,
        };

        if (
          hasError(action.changedPart) ||
          updatedPayband.lowerBound > updatedPayband.upperBound
        ) {
          updatedPayband = addError('하한', updatedPayband);
        } else {
          updatedPayband = removeError('하한', updatedPayband);
          if (
            updatedPayband.error.includes('상한') &&
            !hasError(updatedPayband.upperBound)
          ) {
            updatedPayband = removeError('상한', updatedPayband);
          }
        }
        return state.map((pb, i) => (i === action.idx ? updatedPayband : pb));
      }

      case 'changeGradeWithIndex': {
        const updatedPayband = {
          ...action.payband,
          grade: action.changedPart,
          error: action.payband.error.filter((e) => e !== '직급'),
        };
        return state.map((pb, i) => (i === action.idx ? updatedPayband : pb));
      }

      case 'changeIsCheckedWithIndex':
        return state.map((pb, i) =>
          i === action.idx ? { ...pb, isChecked: !pb.isChecked } : pb,
        );

      case 'addNewRow':
        return [...state, action.payload];

      case 'deleteNewRow':
        return state.filter((item) => !item.isChecked || !item.isNewRow);

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(
    reducer,
    structuredClone(receivedPayband),
  );

  const changedPayband = useMemo(() => {
    return state
      .filter((pb) => pb.modified.length > 0 || pb.isNewRow)
      .filter((pb) => !deletedPayband.some((deleted) => deleted.id === pb.id));
  }, [state, deletedPayband]);

  // const [createdPayband, setCreatedPayband] = useState([]);
  // 생성된 기준과 바뀐 기준 api 다르게 줄 걸 대비해서 써놓음
  const needSave = useMemo(() => {
    return changedPayband.length > 0 || deletedPayband.length > 0;
  }, [changedPayband, deletedPayband]);

  const allChecked = useMemo(() => {
    return state.length > 0 && state.every((pb) => pb.isChecked);
  }, [state]);

  const remainingGrades = useMemo(() => {
    const usedGrades = state.map((item) => item.grade);
    return allGrades.current.filter((grade) => !usedGrades.includes(grade));
  }, [state, allGrades]);

  return (
    <AdjustEditLayout
      prevStepPath="payment-rate"
      nextStepPath="../preparation/target"
      stepPaths={['기준 설정', 'Payband 설정']}
      onCommit={() => {
        const grades = state
          .filter((elem) => elem.grade !== null && elem.grade !== undefined)
          .map((elem) => elem.grade);
        const distinctGrades = new Set(grades);
        const isDuplicated = grades.length !== distinctGrades.size;
        setDuplicated(isDuplicated);

        const updatedPayband = state.map((pb) => {
          // 직급 선택 안된 애들 빼기
          let errors = [...pb.error];
          if (deletedPayband.some((d) => d.id === pb.id)) {
            errors = [];
          } else if (!pb.grade && !errors.includes('직급')) {
            errors.push('직급');
          } else if (pb.grade) {
            const idx = errors.indexOf('직급');
            if (idx > -1) errors.splice(idx, 1);
          }

          return { ...pb, error: errors };
        });

        if (
          updatedPayband.every((pb) => pb.error.length === 0) &&
          !isDuplicated
        ) {
          // 백엔드로 삭제 api
          const cleanPayband = updatedPayband
            .filter(
              (item) =>
                !deletedPayband.some((deleted) => deleted.id === item.id), // 삭제된 애들 빼기
            )
            .map((item) => ({
              ...item,
              modified: [],
              isNewRow: false,
            }));

          // 백엔드로 changedPayband 보냄
          setReceivedPayband(cleanPayband);
          dispatch({ type: 'updatePayband', payload: cleanPayband });

          setDeletedPayband([]);
          // setCreatedPayband([]);
        } else {
          dispatch({ type: 'updatePayband', payload: updatedPayband });
        }
      }}
      onRollback={() => {
        dispatch({
          type: 'updatePayband',
          payload: structuredClone(receivedPayband),
        });
        // setCreatedPayband([]);
        setDeletedPayband([]);
        setDuplicated(false);
      }}
      isCommitted={!needSave}
      canMove
    >
      <div className={`${styles.page}`}>
        <section>
          <h2>Payband 상한, 하한 설정</h2>
        </section>
        <p>직급별 연봉 조정 결과의 상한, 하한을 설정합니다.</p>
        <div className={`${styles.whole_table}`}>
          <div className={`${styles.table_side}`}>
            <div>
              {state.some((pb) => pb.isChecked) && (
                <Button
                  label="삭제"
                  size="small"
                  variant="secondary"
                  onClick={() => {
                    setDeletedPayband((prev) => {
                      const newItems = state.filter(
                        (item) =>
                          item.isChecked &&
                          !prev.some((d) => d.id === item.id) &&
                          !item.isNewRow,
                      );

                      return [...prev, ...newItems];
                    });
                    dispatch({ type: 'deleteNewRow', payload: false });
                  }}
                />
              )}
            </div>
            <div className={`${styles.unit_label}`}>단위: %</div>
          </div>
          <table className={`${styles.table}`}>
            <thead>
              <tr>
                <td>
                  <div className={`${styles.table_cell}`}>
                    <CheckBox
                      isChecked={allChecked}
                      onClick={() => {
                        dispatch({
                          type: 'changeAllIsChecked',
                          payload: !allChecked,
                        });
                      }}
                    />
                  </div>
                </td>
                <td>직급</td>
                <td>하한</td>
                <td>상한</td>
                <td>
                  <div />
                </td>
              </tr>
            </thead>
            <tbody>
              {state.map((item, index) => (
                <PaybandTableRow
                  key={item.id}
                  item={item}
                  isDeleted={deletedPayband.some((d) => d.id === item.id)}
                  originItem={item.isNewRow ? null : receivedPayband[index]}
                  onChange={(modifiedItem, modifiedPart) => {
                    switch (modifiedPart) {
                      case '상한':
                        dispatch({
                          type: 'changeUpperBoundWithIndex',
                          changedPart: modifiedItem,
                          idx: index,
                          originItem: item.isNewRow
                            ? null
                            : receivedPayband[index],
                          payband: item,
                        });
                        break;
                      case '하한':
                        dispatch({
                          type: 'changeLowerBoundWithIndex',
                          changedPart: modifiedItem,
                          idx: index,
                          originItem: item.isNewRow
                            ? null
                            : receivedPayband[index],
                          payband: item,
                        });
                        break;

                      case '직급':
                        dispatch({
                          type: 'changeGradeWithIndex',
                          changedPart: modifiedItem,
                          idx: index,
                          payband: item,
                        });
                        break;

                      case '체크':
                        dispatch({
                          type: 'changeIsCheckedWithIndex',
                          idx: index,
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                  remainingGrades={remainingGrades}
                />
              ))}
              <tr>
                <td colSpan="5" className="button_td">
                  <button
                    type="button"
                    className="add_column"
                    aria-label="add_button"
                    onClick={() => {
                      const newId =
                        state.length > 0
                          ? state[state.length - 1].id + 1
                          : Math.floor(Math.random() * 100000); // 랜덤 ID 는 api에서 마지막id 가져오는 방식으로 나중에 바꿔야할 듯
                      const newItem = {
                        id: newId,
                        grade: undefined,
                        upperBound: 70,
                        lowerBound: 30,
                        modified: [],
                        error: [],
                        isChecked: false,
                        isNewRow: true,
                      };
                      dispatch({ type: 'addNewRow', payload: newItem });
                      // setCreatedPayband
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {duplicated && (
            <div className={`${styles.duplicated_cell}`}>
              중복된 직급이 있습니다.
            </div>
          )}
        </div>
      </div>
    </AdjustEditLayout>
  );
}
