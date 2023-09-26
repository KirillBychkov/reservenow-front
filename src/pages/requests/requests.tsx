import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './requests.module.scss';
import Searchbar from '@/components/searchbar/searchbar';

const Requests: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.requests}>
      <h3 className='heading heading-3'>{t('requests.requests')}</h3>
      <div className={styles.controls}>
        <Searchbar />
      </div>
    </div>
  );
};

export default Requests;
