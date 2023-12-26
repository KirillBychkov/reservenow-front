import React from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton/menuButton';
import useRoleBasedMenu from '@/hooks/useRoleBasedMenu';
import { observer } from 'mobx-react-lite';

const Sidebar: React.FC = () => {
  // Hook that provides menu items for RBAC
  const menu = useRoleBasedMenu();

  return (
    <div className={styles.sidebar}>
      <div className={styles.separator}></div>
      <div className={styles['sidebar__menu']}>
        {menu &&
          menu.map((item) => (
            <MenuButton key={item.page} page={item.page} icon={item.icon}>
              {item.text}
            </MenuButton>
          ))}
      </div>
    </div>
  );
};

export default observer(Sidebar);
