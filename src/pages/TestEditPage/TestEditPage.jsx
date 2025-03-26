import { useState, useEffect } from 'react';
import Pagination from '#components/Pagination';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './test.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import TableOption from '#components/TableOption';

export default function TestEditPage() {
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

  const filterOption = {
    상태: {
      optionType: 'dropdown',
      options: ['진행중', '완료'],
      initialValue: '',
    },
    연도: { optionType: 'text', initialValue: '' },
  };

  const sortOption = {
    keys: ['연도', '상태'],
    values: ['오름차순', '내림차순'],
  };

  const [savedEmployees, setSavedEmployees] = useState([]);
  const [isCommitted, setIsCommitted] = useState(false);

  const targets = employees.filter((e) => e.isTarget);
  const untargets = employees.filter((e) => !e.isTarget);

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

  useEffect(() => {
    setAllChecked((prev) => ({
      ...prev,
      target:
        targets.length > 0 &&
        targets.every((e) => selectedIds.target.includes(e.empId)),
    }));
  }, [selectedIds.target, targets]);

  useEffect(() => {
    setAllChecked((prev) => ({
      ...prev,
      untarget:
        untargets.length > 0 &&
        untargets.every((e) => selectedIds.untarget.includes(e.empId)),
    }));
  }, [selectedIds.untarget, untargets]);

  const toggleSelection = (id, type) => {
    setSelectedIds((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id],
    }));
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
            {/* <Button size="round" label="필터 추가" variant="secondary" />
            <Button
              size="round"
              label="정렬: 직번,직급,부서"
              variant="secondary"
            /> */}
            <TableOption
              filterOption={filterOption}
              sortOption={sortOption}
              onSubmit={(data) => console.log('정렬/필터 결과:', data)}
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
      isCommited={isCommitted}
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
