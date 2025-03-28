import { useReducer, useState } from 'react';
import Pagination from '#components/Pagination';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import TableOption from '#components/TableOption';

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
  const [employees, setEmployees] = useState([
    {
      empId: 'pd0a001',
      name: '홍길동',
      hiredDate: '24.03.03',
      grade: 'A',
      isTarget: true,
    },
    {
      empId: 'pd0a002',
      name: '홍길동',
      hiredDate: '24.03.03',
      grade: 'B',
      isTarget: true,
    },
    {
      empId: 'pd0a003',
      name: '홍길동',
      hiredDate: '24.03.03',
      grade: 'C',
      isTarget: true,
    },
    {
      empId: 'pd0a004',
      name: '홍길동',
      hiredDate: '24.03.03',
      grade: 'D',
      isTarget: true,
    },
    {
      empId: 'pd0a005',
      name: '홍길동',
      hiredDate: '24.03.03',
      grade: 'D',
      isTarget: true,
    },
    {
      empId: 'gh0a001',
      name: '이도현',
      hiredDate: '24.03.03',
      grade: 'A',
      isTarget: false,
    },
    {
      empId: 'gh0a002',
      name: '이도현',
      hiredDate: '24.03.03',
      grade: 'B',
      isTarget: false,
    },
    {
      empId: 'gh0a003',
      name: '이도현',
      hiredDate: '24.03.03',
      grade: 'C',
      isTarget: false,
    },
    {
      empId: 'gh0a004',
      name: '이도현',
      hiredDate: '24.03.03',
      grade: 'D',
      isTarget: false,
    },
  ]);
  const [savedEmployees, setSavedEmployees] = useState([]);
  const [isCommitted, setIsCommitted] = useState(false);
  const [selectedIds, setSelectedIds] = useState({ target: [], untarget: [] });
  const [allChecked, setAllChecked] = useState({
    target: false,
    untarget: false,
  });

  const handleOptionSubmit = (tableType, { type, payload }) => {
    if (type === 'filter') {
      dispatchOption({ type: 'SET_FILTER', tableType, payload });
    } else if (type === 'sort') {
      dispatchOption({ type: 'SET_SORT', tableType, payload });
    }
  };

  const getProcessedEmployees = (type) => {
    let result = employees.filter((e) =>
      type === 'target' ? e.isTarget : !e.isTarget,
    );

    // 필터링
    const filters = optionState.filters[type];
    filters.forEach(({ key, value }) => {
      if (!value || value.length === 0) return;
      const optionType = filterOption[key]?.optionType;
      result = result.filter((e) => {
        const targetValue = eValueForKey(e, key);
        if (optionType === 'text' || optionType === 'dropdown') {
          return value.some((v) => String(targetValue).includes(v));
        }
        if (optionType === 'date') {
          const inputDate = new Date(value[0]);
          const empDate = parseHiredDateToDate(targetValue);
          return (
            empDate.getFullYear() === inputDate.getFullYear() &&
            empDate.getMonth() === inputDate.getMonth() &&
            empDate.getDate() === inputDate.getDate()
          );
        }
        return true;
      });
    });

    // 정렬
    const sortList = optionState.sortList[type];
    sortList.forEach(({ key, value }) => {
      result.sort((a, b) => {
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
    });

    return result;
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

  const toggleSelection = (id, type) => {
    setSelectedIds((prev) => {
      const isSelected = prev[type].includes(id);
      const nextSelected = isSelected
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id];
      const currentList = type === 'target' ? targets : untargets;
      const allSelected = currentList.every((e) =>
        nextSelected.includes(e.empId),
      );
      setAllChecked((prevChecked) => ({ ...prevChecked, [type]: allSelected }));
      return { ...prev, [type]: nextSelected };
    });
    setIsCommitted(false);
  };

  const toggleAll = (type, list) => {
    const next = !allChecked[type];
    setAllChecked((prev) => ({ ...prev, [type]: next }));
    setSelectedIds((prev) => ({
      ...prev,
      [type]: next ? list.map((e) => e.empId) : [],
    }));
    setIsCommitted(false);
  };

  const move = (from, to) => {
    const movingIds = selectedIds[from];
    setEmployees((prev) =>
      prev.map((e) =>
        movingIds.includes(e.empId) ? { ...e, isTarget: to === 'target' } : e,
      ),
    );
    setSelectedIds((prev) => ({ ...prev, [from]: [] }));
    setIsCommitted(false);
  };

  const handleSave = () => {
    setSavedEmployees(employees);
    setIsCommitted(true);
  };

  const handleCancel = () => {
    setEmployees(savedEmployees);
    setSelectedIds({ target: [], untarget: [] });
    setIsCommitted(true);
  };

  const renderTable = (list, type) => (
    <div className={styles.listWrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>
          {type === 'target' ? '대상자' : '비대상자'} 목록
        </span>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.filterWrapper}>
          <div className={styles.filterButton}>
            <TableOption
              filterOption={filterOption}
              sortOption={sortOption}
              filters={optionState.filters[type]}
              sortList={optionState.sortList[type]}
              onSubmit={(submitted) => handleOptionSubmit(type, submitted)}
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
                <td>
                  <CheckBox
                    isChecked={allChecked[type]}
                    onClick={() => toggleAll(type, list)}
                  />
                </td>
                <td>직번</td>
                <td>성명</td>
                <td>채용일자</td>
                <td>평가등급</td>
              </tr>
            </thead>
            <tbody>
              {list.map((row) => (
                <tr key={row.empId}>
                  <td>
                    <CheckBox
                      isChecked={selectedIds[type].includes(row.empId)}
                      onClick={() => toggleSelection(row.empId, type)}
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
        <Pagination
          currentPage={page[type]}
          onPageChange={(p) => setPage((prev) => ({ ...prev, [type]: p }))}
          rowsPerPage={rowsPerPage[type]}
          onRowsPerPageChange={(val) => {
            setRowsPerPage((prev) => ({ ...prev, [type]: val }));
            setPage((prev) => ({ ...prev, [type]: 1 }));
          }}
        />
      </div>
    </div>
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
        {renderTable(paginatedTargets, 'target')}
        <div className={styles.controlWrapper}>
          <button
            type="button"
            className={styles.rightArrow}
            onClick={() => move('target', 'untarget')}
          >
            {'>'}
          </button>
          <button
            type="button"
            className={styles.leftArrow}
            onClick={() => move('untarget', 'target')}
          >
            {'<'}
          </button>
        </div>
        {renderTable(paginatedUntargets, 'untarget')}
      </div>
    </AdjustEditLayout>
  );
}
