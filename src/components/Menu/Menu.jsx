import styles from './menu.module.css';

export default function Menu() {
  return (
    <div className={`${styles.menu_holder}`}>
      <div className={`${styles.menu_content}`}>편집</div>
      <div className={`${styles.menu_content}`}>삭제</div>
    </div>
  );
}
