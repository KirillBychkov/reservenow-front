import HomeCard from '@/components/UI/cards/homeCard';
import React from 'react';
import { People, Refresh } from '@blueprintjs/icons';
import styles from './home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <HomeCard icon={<People />} path='/clients' heading='Клієнти' />
      <HomeCard icon={<Refresh />} path='/requests' heading='Запити' />
    </div>
  );
};

export default Home;
