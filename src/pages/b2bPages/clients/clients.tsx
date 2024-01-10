import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';
import { Client } from '@/models/Client';
import clientStore from '@/store/ClientStore';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './clients.module.scss';
import Searchbar from '@/components/searchbar/searchbar';
import Button from '@/components/UI/buttons/button';
import { Plus } from '@blueprintjs/icons';
import { ProgressSpinner } from 'primereact/progressspinner';
import ClientsTable from '@/components/tables/clientsTable';

const Clients = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = useState('');
  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(clientStore.filters);
  const { data: clients, isLoading } = useFetch<Client[]>(
    () => clientStore.getClients({ limit, skip, search, sort }),
    [limit, skip, search, sort],
    { onError: showError },
  );
  const isClientsEmpty = clients && clients.length === 0 && !isLoading;

  return (
    <div className={styles.pageBody}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
        <Searchbar setSearch={setSearch} />
        <Button onClick={() => navigate('add')} icon={<Plus color='white' />}>
          {t('clients.add')}
        </Button>
      </div>

      {isLoading && (
        <div className={styles.content}>
          <ProgressSpinner />
        </div>
      )}

      {clients?.length && (
        <ClientsTable
          clients={clients}
          onPageChange={onPageChange}
          onSortChange={handleSort}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}

      {isClientsEmpty && (
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
