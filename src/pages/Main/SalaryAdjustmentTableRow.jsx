import { Fragment } from 'react';
import PropTypes from 'prop-types';
import State from '#components/State'; // State 컴포넌트 임포트
import Stepper from '#components/Stepper'; // Stepper 컴포넌트 임포트
import styles from './main-page.module.css'; // 스타일 임포트

function SalaryAdjustmentTableRow({
  row,
  clickedRow,
  handleRowClick,
  handleEditClick,
  handleDeleteClick,
}) {
  function getAdjustmentType(adjType) {
    if (adjType === 'ANNUAL_SALARY_ADJUSTMENT') {
      return '정기 연봉조정';
    }
    if (adjType === 'BASE_UP') {
      return 'Base Up';
    }
    return '승진자 연봉조정';
  }

  function getStatus(workStepText) {
    if (workStepText === '완료') {
      return { status: 'complete', text: '완료' };
    }
    if (workStepText !== null && workStepText !== '조치필요') {
      return { status: 'working', text: '작업중' };
    }
    return { status: 'warning', text: '조치필요' };
  }

  function getInterfaceUse(interfaceUse) {
    if (interfaceUse) {
      return { status: 'complete', text: '완료' };
    }
    return { status: 'warning', text: '미반영' };
  }

  const statusInfo = getStatus(row.work_step);
  const interfaceUse = getInterfaceUse(row.interface_use);

  return (
    /* 나중에 key값은 조정차수ID로 변경 예정 */
    <Fragment key={row.creation_timestamp}>
      <tr
        onClick={() => handleRowClick(row.creation_timestamp)}
        key={row.creation_timestamp}
        className={`${styles['table-body']} ${
          clickedRow === row.creation_timestamp ? styles['selected-row'] : ''
        }`}
      >
        <td className={styles['column-year']}>{row.year}</td>
        <td className={styles['column-month']}>{row.month}</td>
        <td className={styles['column-adj-type']}>
          {row.order_number}차 {getAdjustmentType(row.adj_type)}
        </td>
        <td className={styles['column-status']}>
          <State status={statusInfo.status} text={statusInfo.text} />
        </td>
        <td className={styles['column-interface']}>
          <State status={interfaceUse.status} text={interfaceUse.text} />
        </td>
        <td className={styles['column-work-step']}>{row.work_step}</td>
        <td className={styles['column-date']}>{row.creation_timestamp}</td>
        <td className={styles['column-creator']}>{row.creator}</td>
        {clickedRow === row.creation_timestamp && (
          <td className={styles['button-cell']}>
            <div className={styles['button-container']}>
              <button
                type="button"
                /* 현재는 table key가 creationTimestamp여서 해당 값을 넘김 */
                onClick={() => handleEditClick(row.creation_timestamp)}
                className={styles['edit-button']}
                aria-label="편집"
              />
              <button
                type="button"
                /* 현재는 table key가 creationTimestamp여서 해당 값을 넘김 */
                onClick={() => handleDeleteClick(row.creation_timestamp)}
                className={styles['delete-button']}
                aria-label="삭제"
              />
            </div>
          </td>
        )}
      </tr>
      {clickedRow === row.creation_timestamp && (
        <tr>
          <td colSpan="8" className={styles.stepper}>
            <Stepper adjId={1} />
          </td>
        </tr>
      )}
    </Fragment>
  );
}

SalaryAdjustmentTableRow.propTypes = {
  row: PropTypes.shape({
    creation_timestamp: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    order_number: PropTypes.number.isRequired,
    adj_type: PropTypes.string.isRequired,
    work_step: PropTypes.string.isRequired,
    interface_use: PropTypes.bool.isRequired,
    creator: PropTypes.string.isRequired,
  }).isRequired,
  clickedRow: PropTypes.string.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default SalaryAdjustmentTableRow;
