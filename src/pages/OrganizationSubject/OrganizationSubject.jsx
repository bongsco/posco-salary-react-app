import { useReducer, useState } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import Pagination from '#components/Pagination';
import TableOption from '#components/TableOption';
import TableSelectIndicator from '#components/TableSelectIndicator';

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

const initialEmployees = [
  {
    empId: 'pd0a001',
    name: '홍길동',
    hiredDate: '24.03.04',
    grade: 'A',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a002',
    name: '홍길동',
    hiredDate: '24.03.05',
    grade: 'B',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a003',
    name: '홍길동',
    hiredDate: '24.03.06',
    grade: 'C',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a004',
    name: '홍길동',
    hiredDate: '24.03.09',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a005',
    name: '홍길동',
    hiredDate: '24.03.08',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a006',
    name: '홍길동',
    hiredDate: '24.03.08',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a007',
    name: '홍길동',
    hiredDate: '24.03.10',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a008',
    name: '홍길동',
    hiredDate: '24.03.10',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'gh0a001',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'A',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a002',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'B',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a003',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'C',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a004',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'D',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a005',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'A',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a006',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'B',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a007',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'C',
    isTarget: false,
    selected: false,
  },
  {
    empId: 'gh0a008',
    name: '이도현',
    hiredDate: '24.03.03',
    grade: 'D',
    isTarget: false,
    selected: false,
  },
];

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

const parseHiredDateToDate = (str) => {
  const normalized = `20${str.replace(/\./g, '-')}`;
  return new Date(normalized);
};

const eValueForKey = (e, key) => {
  switch (key) {
    case '직번':
      return e.empId;
    case '성명':
      return e.name;
    case '채용일자':
      return e.hiredDate;
    case '평가등급':
      return e.grade;
    default:
      return '';
  }
};

export default function OrganizationSubject() {
  const [optionState, dispatchOption] = useReducer(
    optionReducer,
    initialOptionState,
  );
  const [page, setPage] = useState({ target: 1, untarget: 1 });
  const [rowsPerPage, setRowsPerPage] = useState({ target: 5, untarget: 5 });
  const [employees, setEmployees] = useState(initialEmployees);

  const [savedEmployees, setSavedEmployees] = useState(initialEmployees);
  const [isCommitted, setIsCommitted] = useState(true);

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
          const targetValue = eValueForKey(e, key);

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

    // 정렬 적용
    const sorted = filtered.slice().sort((a, b) =>
      optionState.sortList[type].reduce((acc, { key, value }) => {
        // 이미 차이가 발생한 경우 다음 조건 비교 안함
        if (acc !== 0) return acc;

        const aVal = eValueForKey(a, key) ?? '';
        const bVal = eValueForKey(b, key) ?? '';

        const comparison = String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
        });

        return value === '오름차순' ? comparison : -comparison;
      }, 0),
    );

    return sorted;
  };

  const hasIsTargetChanged = (current, saved) => {
    return current.some((emp) => {
      const savedEmp = saved.find((e) => e.empId === emp.empId);
      return savedEmp && emp.isTarget !== savedEmp.isTarget;
    });
  };

  const toggleSelection = (id) => {
    const updatedEmployees = employees.map((e) =>
      e.empId === id ? { ...e, selected: !e.selected } : e,
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
        list.some((row) => row.empId === e.empId)
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

  const handleSave = () => {
    setSavedEmployees([...employees]); // 불변성 유지
    setIsCommitted(true);
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

  return (
    <AdjustEditLayout
      prevStepPath="../criteria/payment-rate"
      nextStepPath="high-performance"
      stepPaths={['사전 작업', '대상자 편성']}
      onCommit={handleSave}
      onRollback={handleCancel}
      isCommitted={isCommitted}
      canMove
    >
      <div className={styles.contentWrapper}>
        <section className={styles.listWrapper}>
          <div className={styles.titleWrapper}>
            <h2>대상자 목록록</h2>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButton}>
                <TableOption
                  filterOption={filterOption}
                  sortOption={sortOption}
                  filters={optionState.filters.target}
                  sortList={optionState.sortList.target}
                  onSubmit={(submitted) =>
                    handleOptionSubmit('target', submitted)
                  }
                />
              </div>
              <div className={styles.excelWrapper}>
                <Button size="large" label="엑셀다운로드" variant="secondary" />
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
                    <tr key={row.empId}>
                      <td className={styles.checkboxCell}>
                        <CheckBox
                          isChecked={row.selected}
                          onClick={() => toggleSelection(row.empId)}
                        />
                      </td>
                      <td>{row.empId}</td>
                      <td>{row.name}</td>
                      <td>{row.hiredDate}</td>
                      <td>{row.grade}</td>
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
            <h2>대상자 목록록</h2>
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
                <Button size="large" label="엑셀다운로드" variant="secondary" />
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
                    <tr key={row.empId}>
                      <td className={styles.checkboxCell}>
                        <CheckBox
                          isChecked={row.selected}
                          onClick={() => toggleSelection(row.empId)}
                        />
                      </td>
                      <td>{row.empId}</td>
                      <td>{row.name}</td>
                      <td>{row.hiredDate}</td>
                      <td>{row.grade}</td>
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
