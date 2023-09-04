import styles from './menuButton.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface MenuButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  page: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, icon, page }) => {
  return (
    <NavLink
      to={page}
      type='button'
      className={({ isActive }) =>
        classNames(
          styles['menu-button'],
          isActive && styles['menu-button--selected']
        )
      }
    >
      {icon && <div className={styles['menu-button-icon']}>{icon}</div>}
      {children}
    </NavLink>
  );
};

export default MenuButton;
