import React from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton';
import { Home, People, Refresh } from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const menu = [
    {
      page: '/',
      icon: <Home />,
      text: t('sidebar.home'),
    },
    {
      page: '/clients',
      icon: <People />,
      text: t('sidebar.clients'),
    },
    {
      page: '/requests',
      icon: <Refresh />,
      text: t('sidebar.requests'),
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
