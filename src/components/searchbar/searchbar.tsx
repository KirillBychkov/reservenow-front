import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Search } from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';
import styles from './searchbar.module.scss';
import { Button } from 'primereact/button';

interface Props {
  setSearch: (value: string) => void;
}

const Searchbar: React.FC<Props> = ({ setSearch }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(value);
    }
  };

  return (
    <div className={styles.search}>
      <span className='p-input-icon-left'>
        <i>
          <Search color='gray'></Search>
        </i>
        <InputText
          placeholder={t('actions.search')}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </span>
      <div className={styles.buttonGroup}>
        <Button onClick={() => setSearch(value)}>{t('actions.search')}</Button>
        <Button
          disabled={!value}
          severity='secondary'
          onClick={() => {
            setValue('');
            setSearch('');
          }}
        >
          {t('actions.clear')}
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
