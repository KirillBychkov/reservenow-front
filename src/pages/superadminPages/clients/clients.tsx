import React, { useContext, useState } from 'react';
import styles from './clients.module.scss';
import { Plus, Export } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ClientsTable from '@/components/tables/clientsTable';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { IUser } from '@/models/IUser';
import { ProgressSpinner } from 'primereact/progressspinner';
import Searchbar from '@/components/searchbar/searchbar';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import { PaginatorPageChangeEvent } from 'primereact/paginator';

const Clients: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);

  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.page);
    setFirst(event.first);
  };

  const {
    data: clients,
    errorMsg,
    isLoading,
  } = useFetch<IUser[]>(
    () => clientsStore.getClients({ limit: 8 + page * 8, skip: page * 8 }),
    [page]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.clients}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
        <Searchbar />
        <div className={styles.buttonGroup}>
          <Button icon={<Export color='white' />} severity='secondary'>
            {t('clients.export')}
          </Button>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('clients.add')}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ProgressSpinner />
        </div>
      ) : clients?.length ? (
        <ClientsTable
          clients={clients}
          onPageChange={onPageChange}
          first={first}
        />
      ) : (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary text-center'>
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
