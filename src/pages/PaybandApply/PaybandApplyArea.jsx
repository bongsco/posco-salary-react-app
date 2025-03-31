import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import PaybandApplyTable from './PaybandApplyTable';
import Button from '#components/Button';
import TableOption from '#components/TableOption';

function PaybandApplyArea({ type, data, dispatch, originalData }) {
  // ✅ 체크박스 및 스위치 처리
  const handleCheckBox = (empNum) => {
    dispatch({
      type: 'toggleCheck',
      payload: { boundType: type, empNum },
    });
  };

  const handlePaybandApplyGroupSwitch = (empNums, isOn) => {
    dispatch({
      type: 'toggleGroup',
      payload: { boundType: type, empNums, value: isOn },
    });
  };

  // ✅ 체크된 사번 목록
  const checkedItems = data
    .filter((item) => item.isChecked)
    .map((item) => item.emp_num);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    );
  }, [data, currentPage, rowsPerPage]);

  return (
    <div className={styles['payband-apply-area']}>
      <div className={styles['payband-apply-area-header']}>
        <TableOption
          filterOption={{
            name: { optionType: 'text', initialValue: '' },
            dep_name: {
              optionType: 'dropdown',
              initialValue: '',
              options: [
                '에너지조선마케팅실 산기플랜트팀',
                '에너지조선마케팅실 해양플랜트팀',
              ],
            },
          }}
          sortOption={{
            keys: ['연도', '상태'],
            values: ['오름차순', '내림차순'],
            filters: [],
            sortList: [],
          }}
          onSubmit={{}}
        />
        <Button variant="secondary" size="large" label="엑셀다운로드" />
      </div>
      <PaybandApplyTable
        type={type}
        data={tableData}
        checkedItems={checkedItems}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
        handlePaybandApplyGroupSwitch={handlePaybandApplyGroupSwitch}
        handleCheckBox={handleCheckBox}
        originalData={originalData}
      />
    </div>
  );
}

PaybandApplyArea.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  data: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PaybandApplyArea;
