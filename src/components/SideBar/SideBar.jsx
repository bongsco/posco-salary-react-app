import PropTypes from 'prop-types';
import Item from './Item/Item';
import Category from './Category/Category';
import styles from './sidebar.module.css';
import { icons } from '#components/SideBar/Icon';

/**
 * TODO: Replace `isActive` with `useLocation` check
 *
 * @param {Object} props
 * @param {Array<{
 *   elementType: 'item';
 *   text: string;
 *   href: string;
 *   isActive: boolean;
 *   icon: keyof icons
 * } | {
 *   elementType: 'category';
 *   text: string;
 *   subItems: Array<{
 *     text: string;
 *     href: string;
 *     isActive: boolean;
 *   }>;
 *   icon: keyof icons
 * }>} props.data
 * @returns {React.JSX.Element}
 */
function SideBar({ data }) {
  return (
    <aside className={styles.sidebar}>
      {data.map((element) =>
        element.elementType === 'item' ? (
          <Item
            icon={element.icon}
            text={element.text}
            href={element.href}
            isActive={element.isActive}
            key={`${element.elementType}:${element.text}`}
          />
        ) : (
          <Category
            icon={element.icon}
            text={element.text}
            subItems={element.subItems}
            key={`${element.elementType}:${element.text}`}
          />
        ),
      )}
    </aside>
  );
}

SideBar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      itemType: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOf(Object.keys(icons)),
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          href: PropTypes.string,
          isActive: PropTypes.bool,
        }),
      ),
    }),
  ).isRequired,
};

export default SideBar;
