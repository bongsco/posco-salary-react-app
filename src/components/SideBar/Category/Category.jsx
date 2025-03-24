import PropTypes from 'prop-types';
import styles from './category.module.css';
import Icon, { icons } from '#components/SideBar/Icon';
import CategoryChevron from './CategoryChevron';
import SubMenu from '../SubMenu/SubMenu';

function Category({ icon, text, onClick, isOpen, children }) {
  return (
    <div className={styles['category-area']}>
      <button
        className={styles.category}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick(e);
        }}
      >
        <Icon icon={icon} />
        <div className={styles.caption}>{text}</div>
        <div className={styles.chevron}>
          <CategoryChevron side={isOpen ? 'down' : 'up'} />
        </div>
      </button>
      <div
        className={`${styles.subMenuContainer} ${isOpen ? '' : styles.close}`}
      >
        <SubMenu>{children}</SubMenu>
      </div>
    </div>
  );
}

Category.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

Category.defaultProps = {
  onClick: null,
};

export default Category;
