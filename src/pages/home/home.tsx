import HomeCard from '@/components/UI/cards/homeCard';
import React from 'react';
import { People, Refresh } from '@blueprintjs/icons';
import styles from './home.module.scss';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.home}>
      <HomeCard icon={<People />} path='/clients' heading={t('home.clients')} />
      <HomeCard
        icon={<Refresh />}
        path='/requests'
        heading={t('home.requests')}
      />
    </div>
  );
};

export default Home;
