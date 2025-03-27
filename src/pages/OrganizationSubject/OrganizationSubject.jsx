import { useState } from 'react';
import Pagination from '#components/Pagination';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import TableOption from '#components/TableOption';

export default function OrganizationSubject() {
  const filterOption = {
    평가등급: {
      optionType: 'dropdown',
      options: ['S', 'A', 'B', 'B+', 'C', 'D'],
      initialValue: '',
    },
    채용일자: {
      optionType: 'text',
      initialValue: '',
    },
  };

  const sortOption = {
    keys: ['직번', '성명', '채용일자', '평가등급'],
    values: ['오름차순', '내림차순'],
  };

  const [filters, setFilters] = useState({ target: [], untarget: [] });
  const [sortList, setSortList] = useState({ target: [], untarget: [] });

  const handleOptionSubmit = (tableType, { type, payload }) => {
    if (type === 'filter') {
      setFilters((prev) => ({ ...prev, [tableType]: payload }));
    } else if (type === 'sort') {
      setSortList((prev) => ({ ...prev, [tableType]: payload }));
    }
  };

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

  const getProcessedEmployees = (type) => {
    let result = employees.filter((e) =>
      type === 'target' ? e.isTarget : !e.isTarget,
    );

    // 필터링
    if (Array.isArray(filters[type])) {
      filters[type].forEach(({ key, value }) => {
        if (key === '평가등급' && value.length > 0) {
          result = result.filter((e) => value.includes(e.grade));
        } else if (key === '채용일자' && value[0]) {
          result = result.filter((e) => e.hiredDate.includes(value[0]));
        }
      });
    }

    // 정렬
    if (Array.isArray(sortList[type])) {
      sortList[type].forEach(({ key, value }) => {
        result.sort((a, b) => {
          let aVal = '';
          let bVal = '';
          if (key === '직번') {
            aVal = a.empId;
            bVal = b.empId;
          } else if (key === '성명') {
            aVal = a.name;
            bVal = b.name;
          } else if (key === '채용일자') {
            aVal = a.hiredDate;
            bVal = b.hiredDate;
          } else if (key === '평가등급') {
            aVal = a.grade;
            bVal = b.grade;
          }

          if (value === '오름차순') return aVal.localeCompare(bVal);
          if (value === '내림차순') return bVal.localeCompare(aVal);
          return 0;
        });
      });
    }

    return result;
  };

  const [savedEmployees, setSavedEmployees] = useState([]);
  const [isCommitted, setIsCommitted] = useState(false);

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

  const [selectedIds, setSelectedIds] = useState({ target: [], untarget: [] });
  const [allChecked, setAllChecked] = useState({
    target: false,
    untarget: false,
  });

  const toggleSelection = (id, type) => {
    setSelectedIds((prev) => {
      const isSelected = prev[type].includes(id);
      const nextSelected = isSelected
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id];

      // 현재 리스트: 화면에 보여지는 target/untarget 리스트
      const currentList = type === 'target' ? targets : untargets;
      const allSelected = currentList.every((e) =>
        type === 'target'
          ? nextSelected.includes(e.empId)
          : nextSelected.includes(e.empId),
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
              filters={filters[type]}
              sortList={sortList[type]}
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
