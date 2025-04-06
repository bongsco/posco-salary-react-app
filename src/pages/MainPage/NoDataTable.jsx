import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '#components/Button';
import RegisterModal from '#components/Modal/Register';
import styles from './main-page.module.css';

function NoDataTable({ type, onRegisterSubmit = () => {} }) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles['salary-adjustment-table-area']}>
      <table className={styles['salary-adjustment-table']}>
        <thead>
          <tr>
            <td className={styles['column-year']}>연도</td>
            <td className={styles['column-month']}>월</td>
            <td className={styles['column-adj-type']}>조정유형</td>
            <td className={styles['column-status']}>상태</td>
            <td className={styles['column-interface']}>통합인사반영여부</td>
            <td className={styles['column-work-step']}>진행단계</td>
            <td className={styles['column-date']}>등록일</td>
            <td className={styles['column-creator']}>등록자</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" className={styles['empty-table-cell']}>
              <div className={styles['empty-table-content']}>
                {type === 'logic' ? (
                  <div className={styles['no-data-message']}>
                    조건에 부합하는 연봉 조정 내역이 없습니다.
                  </div>
                ) : (
                  <>
                    <div className={styles['no-data-message']}>
                      연봉 조정 내역이 없습니다.
                    </div>
                    <Button
                      variant="primary"
                      size="medium"
                      label="새 연봉 조정 등록"
                      onClick={handleRegisterClick}
                    />
                    {isRegisterModalOpen && (
                      <RegisterModal
                        option={['정기연봉조정', '승진자연봉조정', 'Base Up']}
                        onSubmit={onRegisterSubmit}
                        onClose={handleCloseRegisterModal}
                        top="130%"
                        right={0}
                      />
                    )}
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

NoDataTable.propTypes = {
  type: PropTypes.string.isRequired,
  onRegisterSubmit: PropTypes.func,
};

NoDataTable.defaultProps = {
  onRegisterSubmit: () => {},
};

export default NoDataTable;
