import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CheckBox from '#components/CheckBox';
import PageNation from '#components/Pagination';
import TableSelectIndicator from '#components/TableSelectIndicator';
import PaybandApplyTableRow from './PaybandApplyTableRow';
import styles from './payband-apply-page.module.css';

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
  totalPage,
}) {
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  useEffect(() => {
    const allChecked = data.every((row) => checkedItems.includes(row.직번));
    setIsHeaderChecked(allChecked);
  }, [data, checkedItems]);

  const handleHeaderCheckboxChange = () => {
    const shouldCheck = !isHeaderChecked;
    const empNums = data.map((item) => item.직번);
    dispatch({
      type: 'setAllChecked',
      payload: { value: shouldCheck, type, empNums },
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
            <td className={styles['no-wrap']}>기준연봉</td>
            <td className={styles['no-wrap']}>
              {type === 'upper' ? '상한금액' : '하한금액'}
            </td>
            <td className={styles['no-wrap']}>Payband 적용</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const originalItem = originalData.find((o) => o.직번 === row.직번);

            return (
              <PaybandApplyTableRow
                key={row.직번}
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
            totalPage={totalPage}
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
  totalPage: PropTypes.number.isRequired,
};

export default PaybandApplyTable;
