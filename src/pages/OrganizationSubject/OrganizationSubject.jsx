import { useState } from 'react';
import Pagination from '#components/Pagination';
import AdjustEditLayout from '#layouts/AdjustEditLayout';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';

export default function OrganizationSubject() {
  const [targets, setTargets] = useState([
    { empId: 'pd0a001', name: '홍길동', hiredDate: '24.03.03', grade: 'A' },
    { empId: 'pd0a002', name: '홍길동', hiredDate: '24.03.03', grade: 'B' },
    { empId: 'pd0a003', name: '홍길동', hiredDate: '24.03.03', grade: 'C' },
    { empId: 'pd0a004', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a005', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a006', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'pd0a007', name: '홍길동', hiredDate: '24.03.03', grade: 'D' },
  ]);

  const [untargets, setUntargets] = useState([
    { empId: 'gh0a001', name: '이도현', hiredDate: '24.03.03', grade: 'A' },
    { empId: 'gh0a002', name: '이도현', hiredDate: '24.03.03', grade: 'B' },
    { empId: 'gh0a003', name: '이도현', hiredDate: '24.03.03', grade: 'C' },
    { empId: 'gh0a004', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a005', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a006', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
    { empId: 'gh0a007', name: '이도현', hiredDate: '24.03.03', grade: 'D' },
  ]);

  const [selectedTargetIds, setSelectedTargetIds] = useState([]);
  const [selectedUntargetIds, setSelectedUntargetIds] = useState([]);

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
                      <CheckBox />
                    </td>
                    <td>직번</td>
                    <td>성명</td>
                    <td>채용일자</td>
                    <td>평가등급</td>
                  </tr>
                </thead>
                <tbody>
                  {targets.map((row) => (
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
            <Pagination />
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
                      <CheckBox />
                    </td>
                    <td>직번</td>
                    <td>성명</td>
                    <td>채용일자</td>
                    <td>평가등급</td>
                  </tr>
                </thead>
                <tbody>
                  {untargets.map((row) => (
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
            <Pagination />
          </div>
        </div>
      </div>
    </AdjustEditLayout>
  );
}
