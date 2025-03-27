import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './payband-apply-page.module.css';
import PaybandApplyTable from './PaybandApplyTable';
import Button from '#components/Button';

function PaybandApplyArea({ type, data, dispatch }) {
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
        <p>필터 추가</p>
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
      />
    </div>
  );
}

PaybandApplyArea.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  data: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PaybandApplyArea;
