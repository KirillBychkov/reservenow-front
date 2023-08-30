import styles from './menuButton.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface MenuButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  page: string;
  isSelected: boolean;
  setIsSelected: (state: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  icon,
  page,
  isSelected,
  setIsSelected,
}) => {
  return (
    <NavLink
      to={page}
      type='button'
      onClick={() => setIsSelected(true)}
      className={classNames(styles['menu-button'], {
        [styles['menu-button--selected']]: isSelected,
      })}
    >
      {icon && <div className={styles['menu-button-icon']}>{icon}</div>}
      {children}
    </NavLink>
  );
};

export default MenuButton;
