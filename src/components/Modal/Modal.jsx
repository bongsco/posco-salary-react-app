import PropTypes from 'prop-types';
import Button from '#components/Button';
import styles from './modal.module.css';

export default function Modal({
  left = 'auto',
  right = 'auto',
  top = 'auto',
  bottom = 'auto',
  children,
  onSubmit,
  onClose,
}) {
  return (
    <div
      className={styles.filters}
      style={{
        left,
        right,
        top,
        bottom,
      }}
    >
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
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Modal.defaultProps = {
  left: 'auto',
  right: 'auto',
  top: 'auto',
  bottom: 'auto',
};
