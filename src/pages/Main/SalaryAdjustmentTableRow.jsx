import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import State from '#components/State';
import Stepper from '#components/Stepper';
import styles from './main-page.module.css';

function SalaryAdjustmentTableRow({
  row,
  index,
  selectedIndex,
  handleRowClick,
  handleDeleteClick,
}) {
  return (
    /* 나중에 key값은 조정차수ID로 변경 예정 */
    <Fragment key={row['등록일']}>
      <tr
        onClick={() => handleRowClick(index)}
        key={row['등록일']}
        className={`${styles['table-body']} ${
          selectedIndex === index ? styles['selected-row'] : ''
        }`}
      >
        <td className={styles['column-year']}>{row['년도']}</td>
        <td className={styles['column-month']}>{row['월구분']}</td>
        <td className={styles['column-adj-type']}>{row['조정제목']}</td>
        <td className={styles['column-status']}>
          <State
            status={row['통합인사반영여부'].status}
            text={row['통합인사반영여부'].text}
          />
        </td>
        <td className={styles['column-interface']}>
          <State status={row['진행단계'].status} text={row['진행단계'].text} />
        </td>
        <td className={styles['column-work-step']}>
          {row['진행단계'].caption}
        </td>
        <td className={styles['column-date']}>{row['등록일']}</td>
        <td className={styles['column-creator']}>{row['등록자']}</td>
        {selectedIndex === index && (
          <td className={styles['button-cell']}>
            <div className={styles['button-container']}>
              <Link to="/adjust/edit/0/annual/criteria/subject">
                <button
                  type="button"
                  /* 현재는 table key가 creationTimestamp여서 해당 값을 넘김 */
                  className={styles['edit-button']}
                  aria-label="편집"
                />
              </Link>
              <button
                type="button"
                /* 현재는 table key가 creationTimestamp여서 해당 값을 넘김 */
                onClick={() => handleDeleteClick(row['등록일'])}
                className={styles['delete-button']}
                aria-label="삭제"
              />
            </div>
          </td>
        )}
      </tr>
      {selectedIndex === index && (
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
    년도: PropTypes.number.isRequired,
    월구분: PropTypes.number.isRequired,
    조정제목: PropTypes.string.isRequired,
    조정종류: PropTypes.string.isRequired,
    차수: PropTypes.number.isRequired,
    통합인사반영여부: PropTypes.bool.isRequired,
    진행단계: PropTypes.string.isRequired,
    등록일: PropTypes.string.isRequired,
    '연봉 시작일': PropTypes.string.isRequired,
    '연봉 종료일': PropTypes.string.isRequired,
    등록자: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default SalaryAdjustmentTableRow;
