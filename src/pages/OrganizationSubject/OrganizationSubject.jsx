import { useReducer, useState } from 'react';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import EmployeeTable from '#pages/OrganizationSubject/EmployeeTable';

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
    hiredDate: '24.03.03',
    grade: 'A',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a002',
    name: '홍길동',
    hiredDate: '24.03.03',
    grade: 'B',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a003',
    name: '홍길동',
    hiredDate: '24.03.03',
    grade: 'C',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a004',
    name: '홍길동',
    hiredDate: '24.03.03',
    grade: 'D',
    isTarget: true,
    selected: false,
  },
  {
    empId: 'pd0a005',
    name: '홍길동',
    hiredDate: '24.03.03',
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
  const [isCommitted, setIsCommitted] = useState(false);

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
    const sorted = optionState.sortList[type].reduce((prev, { key, value }) => {
      return prev.slice().sort((a, b) => {
        const aVal = eValueForKey(a, key) ?? '';
        const bVal = eValueForKey(b, key) ?? '';

        return value === '오름차순'
          ? String(aVal).localeCompare(String(bVal), undefined, {
              numeric: true,
            })
          : String(bVal).localeCompare(String(aVal), undefined, {
              numeric: true,
            });
      });
    }, filtered);

    return sorted;
  };

  const toggleSelection = (id) => {
    setEmployees((prev) =>
      prev.map((e) => (e.empId === id ? { ...e, selected: !e.selected } : e)),
    );
    setIsCommitted(false);
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
    setIsCommitted(false);
  };

  const move = (from, to) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.selected && (from === 'target' ? e.isTarget : !e.isTarget)
          ? { ...e, isTarget: to === 'target', selected: false }
          : e,
      ),
    );
    setIsCommitted(false);
  };

  const handleSave = () => {
    setSavedEmployees([...employees]); // 불변성 유지
    setIsCommitted(true);
  };

  const handleCancel = () => {
    setEmployees(savedEmployees);
    setIsCommitted(true);
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
        <EmployeeTable
          title="대상자 목록"
          filterOption={filterOption}
          sortOption={sortOption}
          employees={paginatedTargets}
          filters={optionState.filters.target}
          sortList={optionState.sortList.target}
          onFilterSortChange={(submitted) =>
            handleOptionSubmit('target', submitted)
          }
          page={page.target}
          rowsPerPage={rowsPerPage.target}
          onPageChange={(p) => setPage((prev) => ({ ...prev, target: p }))}
          onRowsPerPageChange={(val) => {
            setRowsPerPage((prev) => ({ ...prev, target: val }));
            setPage((prev) => ({ ...prev, target: 1 }));
          }}
          toggleAll={toggleAll}
          toggleSelection={toggleSelection}
        />

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

        <EmployeeTable
          title="비대상자 목록"
          filterOption={filterOption}
          sortOption={sortOption}
          employees={paginatedUntargets}
          filters={optionState.filters.untarget}
          sortList={optionState.sortList.untarget}
          onFilterSortChange={(submitted) =>
            handleOptionSubmit('untarget', submitted)
          }
          page={page.untarget}
          rowsPerPage={rowsPerPage.untarget}
          onPageChange={(p) => setPage((prev) => ({ ...prev, untarget: p }))}
          onRowsPerPageChange={(val) => {
            setRowsPerPage((prev) => ({ ...prev, untarget: val }));
            setPage((prev) => ({ ...prev, untarget: 1 }));
          }}
          toggleAll={toggleAll}
          toggleSelection={toggleSelection}
        />
      </div>
    </AdjustEditLayout>
  );
}
