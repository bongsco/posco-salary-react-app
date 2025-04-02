import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import PaybandApplyTable from './PaybandApplyTable';
import Button from '#components/Button';
import TableOption from '#components/TableOption';
import sortObject from '#utils/sortObject';

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
    .map((item) => item.직번);

  const handleSelectAll = () => {
    const empNums = data.map((item) => item.직번); // 현재 테이블의 데이터만 선택
    dispatch({
      type: 'setAllChecked',
      payload: { value: true, empNums },
    });
  };

  const handleClearSelection = () => {
    const empNums = data.map((item) => item.직번); // 현재 테이블의 데이터만 선택 취소
    dispatch({
      type: 'setAllChecked',
      payload: { value: false, empNums },
    });
  };

  const handleTableOptionSubmit = ({ type, payload }) => {
    if (type === 'filter') {
      setFilters(payload);
    }
    if (type === 'sort') {
      setSortList(payload);
    }
  };

  const getSortedUniqueValues = (array, key) =>
    [...new Set(array.map((item) => item[key]))].sort();

  const getPaybandOptions = (array) =>
    [
      ...new Set(array.map((item) => (item.Payband적용 ? '적용' : '미적용'))),
    ].sort();

  const filterOption = useMemo(
    () => ({
      직번: { optionType: 'text', initialValue: '' },
      성명: { optionType: 'text', initialValue: '' },
      부서: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, '부서'),
      },
      직급: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, '직급'),
      },
      평가등급: {
        optionType: 'dropdown',
        initialValue: '',
        options: getSortedUniqueValues(originalData, '평가등급'),
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

    filters.forEach(({ key, value }) => {
      if (!value || value.length === 0) return;

      filtered = filtered.filter((item) => {
        let itemValue;
        if (key === 'Payband적용') {
          itemValue = item[key] ? '적용' : '미적용';
        } else {
          itemValue = item[key];
        }

        return value.includes(itemValue);
      });
    });

    if (sortList.length > 0) {
      filtered = sortObject([...filtered], sortList);
    }

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
          }}
          onSubmit={handleTableOptionSubmit}
          filters={filters.filter(({ value }) => value && value.length > 0)}
          sortList={sortList}
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
