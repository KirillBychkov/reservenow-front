import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton';
import { Home, People, Refresh } from '@blueprintjs/icons';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('/');
  const location = useLocation();

  useEffect(() => {
    setSelectedButton(location.pathname);
  }, [location.pathname]);

  const menu = [
    {
      isSelected: selectedButton === '/',
      page: '/',
      icon: <Home />,
      text: 'Головна',
    },
    {
      isSelected: selectedButton === '/clients',
      page: '/clients',
      icon: <People />,
      text: 'Клієнти',
    },
    {
      isSelected: selectedButton === '/requests',
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
          <MenuButton
            key={item.page}
            isSelected={item.isSelected}
            page={item.page}
            icon={item.icon}
            setIsSelected={() => setSelectedButton(item.page)}
          >
            {item.text}
          </MenuButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
