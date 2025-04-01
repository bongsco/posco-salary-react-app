import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PageNation from '#components/Pagination';
import styles from './payband-apply-page.module.css';
import PaybandApplyTableRow from './PaybandApplyTableRow';
import CheckBox from '#components/CheckBox';
import TableSelectIndicator from '#components/TableSelectIndicator';

function PaybandApplyTable({
  type,
  data,
  checkedItems,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  handlePaybandApplyGroupSwitch,
  handleCheckBox,
  originalData,
  handleSelectAll,
  handleClearSelection,
  dispatch,
}) {
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  useEffect(() => {
    const allChecked = data.every((row) => checkedItems.includes(row.emp_num));
    setIsHeaderChecked(allChecked);
  }, [data, checkedItems]);

  // ✅ 헤더 체크박스 클릭 시 — boundType에 해당하는 전체 행 선택/해제
  const handleHeaderCheckboxChange = () => {
    const shouldCheck = !isHeaderChecked;

    dispatch({
      type: 'setAllChecked',
      payload: { value: shouldCheck, boundType: type },
    });

    setIsHeaderChecked(shouldCheck);
  };

  return (
    <div className={styles['payband-apply-table-area']}>
      <table className={styles['payband-apply-table']}>
        <thead>
          <tr>
            <td>
              <div className={styles['check-box']}>
                <CheckBox
                  isChecked={isHeaderChecked}
                  onClick={handleHeaderCheckboxChange}
                />
              </div>
            </td>
            <td className={styles['no-wrap']}>직번</td>
            <td className={styles['no-wrap']}>성명</td>
            <td className={styles['no-wrap']}>부서</td>
            <td className={styles['no-wrap']}>직급</td>
            <td className={styles['no-wrap']}>평가등급</td>
            <td className={styles['no-wrap']}>기준연봉 월할액</td>
            <td className={styles['no-wrap']}>
              {type === 'upper' ? '상한금액' : '하한금액'}
            </td>
            <td className={styles['no-wrap']}>Payband 적용</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const originalItem = originalData.find(
              (o) => o.emp_num === row.emp_num,
            );

            return (
              <PaybandApplyTableRow
                key={row.emp_num}
                item={row}
                originalItem={originalItem}
                type={type}
                checkedItems={checkedItems}
                handlePaybandApplyGroupSwitch={handlePaybandApplyGroupSwitch}
                handleCheckBox={handleCheckBox}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles['table-bottom-control']}>
        <div className={styles['table-left']}>
          <TableSelectIndicator
            checkedItemCount={checkedItems.length}
            onSelect={handleSelectAll}
            onClear={handleClearSelection}
          />
        </div>
        <div className={styles['table-right']}>
          <PageNation
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

PaybandApplyTable.propTypes = {
  type: PropTypes.oneOf(['upper', 'lower']).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handlePaybandApplyGroupSwitch: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleClearSelection: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PaybandApplyTable;
