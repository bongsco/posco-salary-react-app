import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './category.module.css';
import Icon, { icons } from '#components/SideBar/Icon';
import CategoryChevron from './CategoryChevron';
import SubMenu from './SubMenu/SubMenu';

/**
 * @param {{
 *   icon: keyof icons;
 *   text: string;
 *   onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
 *   subItems: Array<{
 *     text: string;
 *     href: string;
 *   }>;
 * }} props
 * @returns
 */
function Category({ icon, text, onClick, isOpenInitially, subItems }) {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  return (
    <div className={styles['category-area']}>
      <button
        className={styles.category}
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
          if (onClick) onClick(e);
        }}
      >
        <Icon icon={icon} />
        <div className={styles.caption}>{text}</div>
        <div className={styles.chevron}>
          <CategoryChevron side={isOpen ? 'down' : 'up'} />
        </div>
      </button>
      {isOpen ? <SubMenu subItems={subItems} /> : null}
    </div>
  );
}

Category.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isOpenInitially: PropTypes.bool.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Category.defaultProps = {
  onClick: null,
};

export default Category;
