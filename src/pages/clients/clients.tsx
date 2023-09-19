import React, { useEffect, useState } from 'react';
import styles from './clients.module.scss';
import { InputText } from 'primereact/inputtext';
import { Search, Plus, Export } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ClientsTable from '@/components/tables/clientsTable';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { IUser } from '@/models/IUser';

const Clients: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [clients, setClients] = useState<IUser[]>([] as IUser[]);

  useEffect(() => {
    const getClients = async () => {
      const data = await clientsStore.getClients();
      setClients(data);
    };
    getClients();
  }, []);

  return (
    <div className={styles.clients}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
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
        <div className={styles.buttonGroup}>
          <Button icon={<Export color='white' />} severity='secondary'>
            {t('clients.export')}
          </Button>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('clients.add')}
          </Button>
        </div>
      </div>
      {clients.length ? (
        <ClientsTable clients={clients} />
      ) : (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary'>
            {t('clients.null')}
          </h2>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('clients.add')}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Clients;
