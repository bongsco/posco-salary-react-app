import styles from '../filter-modal.module.css';

export default function Filter() {
  return (
    <div className={styles.filter}>
      <div className={styles.filterName}>월 : 1</div>
      <span className={styles.remove}>X</span>
    </div>
  );
}
