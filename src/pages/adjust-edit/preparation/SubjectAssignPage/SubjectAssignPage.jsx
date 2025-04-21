import { useReducer, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import Pagination from '#components/Pagination';
import TableOption from '#components/TableOption';
import TableSelectIndicator from '#components/TableSelectIndicator';
import { useAdjustContext } from '#contexts/AdjustContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
import useFetchWithAuth from '#hooks/useFetchWithAuth';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import constant from '#src/constant';
import sortObject from '#utils/sortObject';
import styles from './subject-assign-page.module.css';
import '#styles/global.css';
import '#styles/table.css';

const filterOption = {
  평가등급: {
    optionType: 'dropdown',
    options: ['S', 'A', 'B', 'B+', 'C', 'D'],
    initialValue: '',
  },
  채용일자: {
    optionType: 'date',
    initialValue: '',
  },
  성명: {
    optionType: 'text',
    initialValue: '',
  },
  직번: {
    optionType: 'text',
    initialValue: '',
  },
};

const sortOption = {
  keys: ['직번', '성명', '채용일자', '평가등급'],
  values: ['오름차순', '내림차순'],
};

const initialOptionState = {
  filters: { target: [], untarget: [] },
  sortList: { target: [], untarget: [] },
};

const optionReducer = (state, action) => {
  const { tableType, payload } = action;
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [tableType]: payload },
      };
    case 'SET_SORT':
      return {
        ...state,
        sortList: { ...state.sortList, [tableType]: payload },
      };
    case 'RESET':
      return initialOptionState;
    default:
      return state;
  }
};

// "2023-01-30" → "23.01.30" 형식 변환 함수
function formatHireDate(dateStr) {
  const date = new Date(dateStr);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

function convertEmployeeDto(dto) {
  return {
    id: dto.employeeId, // 🔥 여기에 추가!
    직번: dto.empNum,
    성명: dto.name,
    채용일자: formatHireDate(dto.hireDate),
    평가등급: dto.rankName,
    isTarget: dto.subjectUse === true,
    selected: false,
  };
}

const parseHiredDateToDate = (str) => {
  const normalized = `20${str.replace(/\./g, '-')}`;
  return new Date(normalized);
};

export default function OrganizationSubject() {
  const { adjust } = useAdjustContext();
  const { addError } = useErrorHandlerContext();
  const fetchWithAuth = useFetchWithAuth();

  const [optionState, dispatchOption] = useReducer(
    optionReducer,
    initialOptionState,
  );
  const [page, setPage] = useState({ target: 1, untarget: 1 });
  const [rowsPerPage, setRowsPerPage] = useState({ target: 5, untarget: 5 });
  const [employees, setEmployees] = useState([]);

  const [savedEmployees, setSavedEmployees] = useState([]);
  const [isCommitted, setIsCommitted] = useState(true);

  useSWR(
    adjust?.adjustId
      ? `/adjust/${adjust.adjustId}/preparation/employees`
      : null,
    async (url) => {
      const res = await fetchWithAuth(url);
      // 상태 코드가 200-299 범위가 아니더라도,
      // 파싱 시도를 하고 에러를 던집니다.
      if (!res?.ok) {
        addError(
          `Sent Request to /api/notfound (${process.env.REACT_APP_API_URL}) and the connection refused.`,
          'error message',
          'CONNECTION_REFUSED',
        );
      }

      const data = await res.json();
      return data.map(convertEmployeeDto);
    },
    {
      onSuccess: (response) => {
        setEmployees(response);
        setSavedEmployees(response);
      },
    },
  );

  const handleOptionSubmit = (tableType, { type, payload }) => {
    if (type === 'filter') {
      dispatchOption({ type: 'SET_FILTER', tableType, payload });
    } else if (type === 'sort') {
      dispatchOption({ type: 'SET_SORT', tableType, payload });
    }
  };

  const getProcessedEmployees = (type) => {
    // 초기 필터링 (target 여부)
    const initial = employees.filter((e) =>
      type === 'target' ? e.isTarget : !e.isTarget,
    );

    // 필터 적용
    const filtered = optionState.filters[type].reduce(
      (prev, { key, value }) => {
        if (!value || value.length === 0) return prev;

        const optionType = filterOption[key]?.optionType;
        if (!optionType) return prev;

        return prev.filter((e) => {
          const targetValue = e[key];
          if (optionType === 'date') {
            const inputDate = new Date(value[0]);
            const empDate = parseHiredDateToDate(targetValue);
            return (
              empDate.getFullYear() === inputDate.getFullYear() &&
              empDate.getMonth() === inputDate.getMonth() &&
              empDate.getDate() === inputDate.getDate()
            );
          }

          return value.some((val) => String(targetValue).includes(val));
        });
      },
      initial,
    );

    const sorted = sortObject(filtered, optionState.sortList[type]);

    return sorted;
  };

  const hasIsTargetChanged = (current, saved) => {
    return current.some((emp) => {
      const savedEmp = saved.find((e) => e.직번 === emp.직번);
      return savedEmp && emp.isTarget !== savedEmp.isTarget;
    });
  };

  const toggleSelection = (id) => {
    const updatedEmployees = employees.map((e) =>
      e.직번 === id ? { ...e, selected: !e.selected } : e,
    );
    setEmployees(updatedEmployees);

    // isTarget 변경 여부 확인
    if (hasIsTargetChanged(updatedEmployees, savedEmployees)) {
      setIsCommitted(false);
    } else {
      setIsCommitted(true);
    }
  };

  const toggleAll = (list) => {
    const shouldSelectAll = !list.every((e) => e.selected);
    setEmployees((prev) =>
      prev.map((e) =>
        list.some((row) => row.직번 === e.직번)
          ? { ...e, selected: shouldSelectAll }
          : e,
      ),
    );
  };

  const move = (from, to) => {
    let hasMoved = false;

    const updatedEmployees = employees.map((e) => {
      const shouldMove =
        e.selected && (from === 'target' ? e.isTarget : !e.isTarget);
      if (shouldMove) hasMoved = true;
      return shouldMove
        ? { ...e, isTarget: to === 'target', selected: false }
        : e;
    });

    if (hasMoved) {
      setEmployees(updatedEmployees);
      // isTarget이 실제로 변경된 게 있으면 버튼 활성화
      if (hasIsTargetChanged(updatedEmployees, savedEmployees)) {
        setIsCommitted(false);
      } else {
        setIsCommitted(true);
      }
    }
  };

  const handleSave = async () => {
    // 변경된 직원만 추려서 PATCH 요청 보내기
    const changedSubjectUseEmployee = employees
      .filter((emp) => {
        const original = savedEmployees.find((e) => e.직번 === emp.직번);
        return original && emp.isTarget !== original.isTarget;
      })
      .map((emp) => ({
        employeeId: emp.id, // 이건 convertEmployeeDto에서 추가한 값
        subjectUse: emp.isTarget,
      }));

    try {
      if (changedSubjectUseEmployee.length > 0) {
        const res = await fetchWithAuth(
          `/adjust/${adjust.adjustId}/preparation/employees`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ changedSubjectUseEmployee }),
          },
        );

        if (!res?.ok) {
          addError(
            `Sent Request to /api/notfound (${process.env.REACT_APP_API_URL}) and the connection refused.`,
            'error message',
            'CONNECTION_REFUSED',
          );
        }
      }
      await mutate(`/adjust/${adjust.adjustId}/preparation/employees`);

      // 💾 성공 시 상태 동기화
      setSavedEmployees([...employees]);
      setIsCommitted(true);
    } catch (e) {
      addError('대상자 저장 중 오류가 발생했습니다.', e.message, 'PATCH_ERROR');
    }
  };

  const handleCancel = () => {
    setEmployees(savedEmployees);
    setIsCommitted(true);
  };

  const onSelectAll = (type) => {
    const updatedEmployees = employees.map((employee) => {
      const isCurrentType =
        type === 'target' ? employee.isTarget : !employee.isTarget;
      return isCurrentType ? { ...employee, selected: true } : employee;
    });

    setEmployees(updatedEmployees);
  };

  const onClearSelection = (type) => {
    const updatedEmployees = employees.map((employee) => {
      const isCurrentType =
        type === 'target' ? employee.isTarget : !employee.isTarget;
      return isCurrentType ? { ...employee, selected: false } : employee;
    });

    setEmployees(updatedEmployees);
  };

  const getCheckedItemCount = (type) => {
    return employees.filter(
      (e) => (type === 'target' ? e.isTarget : !e.isTarget) && e.selected,
    ).length;
  };

  const targets = getProcessedEmployees('target');
  const untargets = getProcessedEmployees('untarget');

  const paginatedTargets = targets.slice(
    (page.target - 1) * rowsPerPage.target,
    page.target * rowsPerPage.target,
  );
  const paginatedUntargets = untargets.slice(
    (page.untarget - 1) * rowsPerPage.untarget,
    page.untarget * rowsPerPage.untarget,
  );

  const aRef = useRef(null);

  const handleExcelDownload = async (type) => {
    try {
      const res = await fetchWithAuth(
        `/api/adjust/excel/download?adjustId=${adjust.adjustId}&pageType=${type}`,
      );
      if (!res.ok) throw new Error('엑셀 다운로드 실패');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // a 태그 조작
      if (aRef.current) {
        aRef.current.href = url;
        aRef.current.download = `bongsco_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        aRef.current.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      addError(
        '엑셀 다운로드 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        err.message,
        'EXCEL_DOWNLOAD_ERROR',
      );
    }
  };

  return (
    <AdjustEditLayout
      prevStepPath="../criteria/payband"
      nextStepPath="high-performance"
      stepPaths={['사전 작업', '대상자 편성']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommitted={isCommitted}
      stepId={constant.step.annual.preparation.subject}
      canMove
    >
      <div className={styles.contentWrapper}>
        <section className={styles.listWrapper}>
          <div className={styles.titleWrapper}>
            <h2>대상자 목록</h2>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButton}>
                <TableOption
                  filterOption={filterOption}
                  sortOption={sortOption}
                  filters={optionState.filters.target}
                  sortList={optionState.sortList.target}
                  onSubmit={(submitted) => {
                    handleOptionSubmit('target', submitted);
                  }}
                />
              </div>
              <div className={styles.excelWrapper}>
                <Button
                  size="large"
                  label="엑셀다운로드"
                  variant="secondary"
                  onClick={() => handleExcelDownload('Subject')}
                />
                <a
                  ref={aRef}
                  href="about:blank"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  엑셀 다운로드
                </a>
              </div>
            </div>
            <div className={styles.tables}>
              <table>
                <thead>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <CheckBox
                        isChecked={paginatedTargets.every((e) => e.selected)}
                        onClick={() => toggleAll(paginatedTargets)}
                      />
                    </td>
                    <td>직번</td>
                    <td>성명</td>
                    <td>채용일자</td>
                    <td>평가등급</td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTargets.map((row) => (
                    <tr key={row.직번}>
                      <td className={styles.checkboxCell}>
                        <CheckBox
                          isChecked={row.selected}
                          onClick={() => toggleSelection(row.직번)}
                        />
                      </td>
                      <td>{row.직번}</td>
                      <td>{row.성명}</td>
                      <td>{row.채용일자}</td>
                      <td>{row.평가등급}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.paginationWrapper}>
            <TableSelectIndicator
              checkedItemCount={getCheckedItemCount('target')}
              onSelect={() => onSelectAll('target')}
              onClear={() => onClearSelection('target')}
            />
            <Pagination
              currentPage={page.target}
              onPageChange={(p) => setPage((prev) => ({ ...prev, target: p }))}
              rowsPerPage={rowsPerPage.target}
              onRowsPerPageChange={(val) => {
                setRowsPerPage((prev) => ({ ...prev, target: val }));
                setPage((prev) => ({ ...prev, target: 1 }));
              }}
            />
          </div>
        </section>

        <div className={styles.controlWrapper}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => move('target', 'untarget')}
          >
            {'>'}
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => move('untarget', 'target')}
          >
            {'<'}
          </button>
        </div>

        <section className={styles.listWrapper}>
          <div className={styles.titleWrapper}>
            <h2>비대상자 목록</h2>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButton}>
                <TableOption
                  filterOption={filterOption}
                  sortOption={sortOption}
                  filters={optionState.filters.untarget}
                  sortList={optionState.sortList.untarget}
                  onSubmit={(submitted) =>
                    handleOptionSubmit('untarget', submitted)
                  }
                />
              </div>
              <div className={styles.excelWrapper}>
                <Button
                  size="large"
                  label="엑셀다운로드"
                  variant="secondary"
                  onClick={() => handleExcelDownload('NonSubject')}
                />
                <a
                  ref={aRef}
                  href="about:blank"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  엑셀 다운로드
                </a>
              </div>
            </div>
            <div className={styles.tables}>
              <table>
                <thead>
                  <tr>
                    <td className={styles.checkboxCell}>
                      <CheckBox
                        isChecked={paginatedUntargets.every((e) => e.selected)}
                        onClick={() => toggleAll(paginatedUntargets)}
                      />
                    </td>
                    <td>직번</td>
                    <td>성명</td>
                    <td>채용일자</td>
                    <td>평가등급</td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUntargets.map((row) => (
                    <tr key={row.직번}>
                      <td className={styles.checkboxCell}>
                        <CheckBox
                          isChecked={row.selected}
                          onClick={() => toggleSelection(row.직번)}
                        />
                      </td>
                      <td>{row.직번}</td>
                      <td>{row.성명}</td>
                      <td>{row.채용일자}</td>
                      <td>{row.평가등급}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.paginationWrapper}>
            <TableSelectIndicator
              checkedItemCount={getCheckedItemCount('untarget')}
              onSelect={() => onSelectAll('untarget')}
              onClear={() => onClearSelection('untarget')}
            />
            <Pagination
              currentPage={page.untarget}
              onPageChange={(p) =>
                setPage((prev) => ({ ...prev, untarget: p }))
              }
              rowsPerPage={rowsPerPage.untarget}
              onRowsPerPageChange={(val) => {
                setRowsPerPage((prev) => ({ ...prev, untarget: val }));
                setPage((prev) => ({ ...prev, untarget: 1 }));
              }}
            />
          </div>
        </section>
      </div>
    </AdjustEditLayout>
  );
}
