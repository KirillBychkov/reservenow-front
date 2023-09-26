import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Search } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useTranslation } from 'react-i18next';
import styles from './searchbar.module.scss';

const Searchbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.search}>
      <span className='p-input-icon-left'>
        <i>
          <Search color='gray'></Search>
        </i>
        <InputText placeholder='Search' className={styles.input} />
      </span>
      <div className={styles.buttonGroup}>
        <Button>{t('clients.search')}</Button>
        <Button severity='secondary'>{t('clients.clear')}</Button>
      </div>
    </div>
  );
};

export default Searchbar;
