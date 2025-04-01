import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import PaybandApplyTable from './PaybandApplyTable';
import Button from '#components/Button';
import TableOption from '#components/TableOption';

// 🔁 한글 → 실제 데이터 필드명 매핑
const convertKeyToField = (key) => {
  const map = {
    직번: 'emp_num',
    성명: 'name',
    부서: 'dep_name',
    직급: 'grade_name',
    평가등급: 'rank_name',
    기준연봉: 'std_salary',
    상한금액: 'upper_limit_price',
    하한금액: 'lower_limit_price',
    Payband적용: 'in_payband_use_group',
  };
  return map[key] || key;
};

function PaybandApplyArea({ type: boundType, data, dispatch, originalData }) {
  const [filters, setFilters] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);

  const handleCheckBox = (empNum) => {
    dispatch({
      type: 'toggleCheck',
      payload: { boundType, empNum },
    });
  };

  const handlePaybandApplyGroupSwitch = (empNums, isOn) => {
    dispatch({
      type: 'toggleGroup',
      payload: { boundType, empNums, value: isOn },
    });
  };

  const checkedItems = data
    .filter((item) => item.isChecked)
    .map((item) => item.emp_num);

  const handleSelectAll = () => {
    dispatch({
      type: 'setAllChecked',
      payload: { value: true, boundType },
    });
  };

  const handleClearSelection = () => {
    dispatch({
      type: 'setAllChecked',
      payload: { value: false, boundType },
    });
  };

  const handleTableOptionSubmit = ({ type, payload }) => {
    if (type === 'filter') setFilters(payload);
    if (type === 'sort') setSortList(payload);
  };

  // 🔁 옵션 생성 함수
  const getSortedUniqueValues = (array, key) =>
    [...new Set(array.map((item) => item[key]))].sort();

  const getPaybandOptions = (array) =>
    [
      ...new Set(
        array.map((item) => (item.in_payband_use_group ? '적용' : '미적용')),
      ),
    ].sort();

  const filterOption = useMemo(
    () => ({
      직번: { optionType: 'text', initialValue: '' },
      성명: { optionType: 'text', initialValue: '' },
      부서: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, 'dep_name'),
      },
      직급: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, 'grade_name'),
      },
      평가등급: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, 'rank_name'),
      },
      Payband적용: {
        optionType: 'dropdown',
        initialValue: '',
        options: getPaybandOptions(originalData),
      },
    }),
    [originalData],
  );

  useEffect(() => {
    let filtered = [...data];

    // ✅ 필터 적용
    filters.forEach(({ key, value }) => {
      if (!value || value.length === 0) return;

      filtered = filtered.filter((item) => {
        const field = convertKeyToField(key);
        let itemValue;
        if (field === 'in_payband_use_group') {
          itemValue = item[field] ? '적용' : '미적용';
        } else {
          itemValue = item[field];
        }

        return value.includes(itemValue);
      });
    });

    // ✅ 정렬 적용 (마지막 정렬 기준만 사용)
    const lastSort = sortList[sortList.length - 1];
    if (lastSort) {
      const field = convertKeyToField(lastSort.key);
      const isAsc = lastSort.value === '오름차순';

      filtered = [...filtered].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return isAsc ? aVal - bVal : bVal - aVal;
        }

        return isAsc
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    // ✅ 페이지 적용
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setTableData(filtered.slice(start, end));
  }, [data, currentPage, rowsPerPage, filters, sortList]);

  return (
    <div className={styles['payband-apply-area']}>
      <div className={styles['payband-apply-area-header']}>
        <TableOption
          filterOption={filterOption}
          sortOption={{
            keys: [
              '직번',
              '성명',
              '부서',
              '직급',
              '평가등급',
              '기준연봉',
              boundType === 'upper' ? '상한금액' : '하한금액',
            ],
            values: ['오름차순', '내림차순'],
            filters,
            sortList,
          }}
          onSubmit={handleTableOptionSubmit}
        />
        <Button variant="secondary" size="large" label="엑셀다운로드" />
      </div>
      <PaybandApplyTable
        type={boundType}
        data={tableData}
        checkedItems={checkedItems}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
        handlePaybandApplyGroupSwitch={handlePaybandApplyGroupSwitch}
        handleCheckBox={handleCheckBox}
        originalData={originalData}
        handleSelectAll={handleSelectAll}
        handleClearSelection={handleClearSelection}
        dispatch={dispatch}
      />
    </div>
  );
}

PaybandApplyArea.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PaybandApplyArea;
