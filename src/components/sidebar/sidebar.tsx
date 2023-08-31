import React, { useState } from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton';
import { Home, People, Refresh } from '@blueprintjs/icons';

const Sidebar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('/');

  const handleButtonClick = (page: string) => {
    setSelectedButton(page);
  };

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
      {menu.map((item) => (
        <MenuButton
          key={item.page}
          isSelected={item.isSelected}
          page={item.page}
          icon={item.icon}
          setIsSelected={() => handleButtonClick(item.page)}
        >
          {item.text}
        </MenuButton>
      ))}
    </div>
  );
};

export default Sidebar;
