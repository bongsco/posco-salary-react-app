import { useState, useEffect } from 'react';
import Pagination from '#components/Pagination';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';

export default function OrganizationSubject() {
  const [targetPage, setTargetPage] = useState(1);
  const [untargetPage, setUntargetPage] = useState(1);

  const [targetRowsPerPage, setTargetRowsPerPage] = useState(5);
  const [untargetRowsPerPage, setUntargetRowsPerPage] = useState(5);

  const [targets, setTargets] = useState([
    { empId: 'pd0a001', name: '홍길동', hiredDate: '24.03.03', grade: 'A' },
    { empId: 'pd0a002', name: '홍길동', hiredDate: '24.03.03', grade: 'B' },
    { empId: 'pd0a003', name: '홍길동', hiredDate: '24.03.03', grade: 'C' },
    { empId: 'pd0a004', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a005', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a006', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a007', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
  ]);

  const paginatedTargets = targets.slice(
    (targetPage - 1) * targetRowsPerPage,
    targetPage * targetRowsPerPage,
  );

  const [untargets, setUntargets] = useState([
    { empId: 'gh0a001', name: '이도현', hiredDate: '24.03.03', grade: 'A' },
    { empId: 'gh0a002', name: '이도현', hiredDate: '24.03.03', grade: 'B' },
    { empId: 'gh0a003', name: '이도현', hiredDate: '24.03.03', grade: 'C' },
    { empId: 'gh0a004', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a005', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a006', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a007', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
  ]);

  const paginatedUnTargets = untargets.slice(
    (untargetPage - 1) * untargetRowsPerPage,
    untargetPage * untargetRowsPerPage,
  );

  const [selectedTargetIds, setSelectedTargetIds] = useState([]);
  const [selectedUntargetIds, setSelectedUntargetIds] = useState([]);

  const [allTargetsChecked, setAllTargetsChecked] = useState(false);
  const [allUntargetsChecked, setAllUntargetsChecked] = useState(false);

  useEffect(() => {
    setAllTargetsChecked(
      targets.length > 0 &&
        targets.every((row) => selectedTargetIds.includes(row.empId)),
    );
  }, [selectedTargetIds, targets]);

  useEffect(() => {
    setAllUntargetsChecked(
      untargets.length > 0 &&
        untargets.every((row) => selectedUntargetIds.includes(row.empId)),
    );
  }, [selectedUntargetIds, untargets]);

  const toggleSelection = (id, isTarget = true) => {
    if (isTarget) {
      setSelectedTargetIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      setSelectedUntargetIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    }
  };

  const moveRight = () => {
    const moving = targets.filter((row) =>
      selectedTargetIds.includes(row.empId),
    );
    setTargets((prev) =>
      prev.filter((row) => !selectedTargetIds.includes(row.empId)),
    );
    setUntargets((prev) => [...prev, ...moving]);
    setSelectedTargetIds([]);
  };

  const moveLeft = () => {
    const moving = untargets.filter((row) =>
      selectedUntargetIds.includes(row.empId),
    );
    setUntargets((prev) =>
      prev.filter((row) => !selectedUntargetIds.includes(row.empId)),
    );
    setTargets((prev) => [...prev, ...moving]);
    setSelectedUntargetIds([]);
  };

  return (
    <AdjustEditLayout
      prevStepPath="../criteria/payment-rate"
      nextStepPath="high-performance"
      stepPaths={['사전 작업', '대상자 편성']}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.listWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>대상자 목록</span>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButton}>
                <Button size="round" label="필터 추가" variant="secondary" />
                <Button
                  size="round"
                  label="정렬: 직번,직급,부서"
                  variant="secondary"
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
                        isChecked={allTargetsChecked}
                        onClick={() => {
                          const next = !allTargetsChecked;
                          setAllTargetsChecked(next);
                          setSelectedTargetIds(
                            next ? targets.map((r) => r.empId) : [],
                          );
                        }}
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
                      <td>
                        <CheckBox
                          isChecked={selectedTargetIds.includes(row.empId)}
                          onClick={() => toggleSelection(row.empId, true)}
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
              currentPage={targetPage}
              onPageChange={setTargetPage}
              rowsPerPage={targetRowsPerPage}
              onRowsPerPageChange={(val) => {
                setTargetRowsPerPage(val);
                setTargetPage(1);
              }}
            />
          </div>
        </div>
        <div className={styles.controlWrapper}>
          <button
            type="button"
            className={styles.rightArrow}
            onClick={moveRight}
          >
            {'>'}
          </button>
          <button type="button" className={styles.leftArrow} onClick={moveLeft}>
            {'<'}
          </button>
        </div>
        <div className={styles.listWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>비대상자 목록</span>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButton}>
                <Button size="round" label="필터 추가" variant="secondary" />
                <Button
                  size="round"
                  label="정렬: 직번,직급,부서"
                  variant="secondary"
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
                        isChecked={allUntargetsChecked}
                        onClick={() => {
                          const next = !allUntargetsChecked;
                          setAllUntargetsChecked(next);
                          setSelectedUntargetIds(
                            next ? untargets.map((r) => r.empId) : [],
                          );
                        }}
                      />
                    </td>
                    <td>직번</td>
                    <td>성명</td>
                    <td>채용일자</td>
                    <td>평가등급</td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUnTargets.map((row) => (
                    <tr key={row.empId}>
                      <td>
                        <CheckBox
                          isChecked={selectedUntargetIds.includes(row.empId)}
                          onClick={() => toggleSelection(row.empId, false)}
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
              currentPage={untargetPage}
              onPageChange={setUntargetPage}
              rowsPerPage={untargetRowsPerPage}
              onRowsPerPageChange={(val) => {
                setUntargetRowsPerPage(val);
                setUntargetPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </AdjustEditLayout>
  );
}
