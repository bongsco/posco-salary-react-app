import PropTypes from 'prop-types';
import styles from './modal.module.css';
import Button from '#components/Button';

export default function Modal({ children, onSubmit, onClose }) {
  return (
    <div className={styles.filters}>
      {children}
      <div className={styles.buttonWrapper}>
        <Button
          variant="primary"
          label="추가"
          size="xsmall"
          onClick={onSubmit}
        />
        <Button
          variant="secondary"
          label="닫기"
          size="xsmall"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
