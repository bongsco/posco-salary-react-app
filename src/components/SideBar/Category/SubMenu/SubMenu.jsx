import PropTypes from 'prop-types';
import styles from './submenu.module.css';
import SubItem from './SubItem';

/**
 * TODO: Replace `isActive` with `useLocation` check
 *
 * @param {{
 *   subItems: {
 *     href: string;
 *     text: string;
 *     isActive: string;
 *   }[]
 * }} props
 * @returns { React.JSX.Element }
 */
export default function SubMenu({ subItems }) {
  return (
    <div className={styles.submenu}>
      {subItems.map((option) => (
        <SubItem
          key={option.href}
          href={option.href}
          text={option.text}
          isActive={option.isActive}
        />
      ))}
    </div>
  );
}

SubMenu.propTypes = {
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
