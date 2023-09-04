import React from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton';
import { Home, People, Refresh } from '@blueprintjs/icons';

const Sidebar: React.FC = () => {
  const menu = [
    {
      page: '/',
      icon: <Home />,
      text: 'Головна',
    },
    {
      page: '/clients',
      icon: <People />,
      text: 'Клієнти',
    },
    {
      page: '/requests',
      icon: <Refresh />,
      text: 'Запити',
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.separator}></div>
      <div className={styles['sidebar__menu']}>
        {menu.map((item) => (
          <MenuButton key={item.page} page={item.page} icon={item.icon}>
            {item.text}
          </MenuButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
