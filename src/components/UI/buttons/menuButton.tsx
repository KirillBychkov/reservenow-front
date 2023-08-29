import { useState } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

interface MenuButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, icon }) => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type='button'
      onClick={() => setSelected(!selected)}
      className={classNames(styles['menu-button'], {
        [styles['menu-button--selected']]: selected,
      })}
    >
      {icon && <div className={styles['menu-button-icon']}>{icon}</div>}
      {children}
    </button>
  );
};

export default MenuButton;
