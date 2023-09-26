import HomeCard from '@/components/UI/cards/homeCard';
import React from 'react';
import styles from './home.module.scss';
import useRoleBasedMenu from '@/hooks/useRoleBasedMenu';
import { observer } from 'mobx-react-lite';

const Home: React.FC = () => {
  const menu = useRoleBasedMenu().filter((item) => item.page !== '/');

  return (
    <div className={styles.home}>
      {menu.map((item) => (
        <HomeCard
          key={item.text}
          icon={item.icon}
          path={item.page}
          heading={item.text}
        ></HomeCard>
      ))}
    </div>
  );
};

export default observer(Home);
