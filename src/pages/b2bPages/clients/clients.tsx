import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';
import { Client } from '@/models/Client';
import clientStore from '@/store/clientStore';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './clients.module.scss';
import Searchbar from '@/components/searchbar/searchbar';
import Button from '@/components/UI/buttons/button';
import { Export, Plus } from '@blueprintjs/icons';
import { ProgressSpinner } from 'primereact/progressspinner';
import ClientsTable from '@/components/tables/clientsTable';
import Flex from '@/components/UI/layout/flex';
import useSearch from '@/hooks/useSearch';

const Clients = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useContext(ToastContext);

  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(clientStore.filters);
  const { search, handleSearch } = useSearch(onPageChange);

  const { data: clients, isLoading } = useFetch<Client[]>(
    () => clientStore.getClients({ limit, skip, search, sort }),
    [limit, skip, search, sort],
    { onError: showError },
  );

  return (
    <div className={styles.pageBody}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
        <Searchbar
          searchPlaceholder={t('clients.customerSearchPlaceholder')}
          setSearch={handleSearch}
        />
        <Flex options={{ gap: 1 }}>
          <Button
            icon={<Export color='white' />}
            severity='secondary'
            onClick={() =>
              clientStore.initiateExport({ limit, skip, search, sort })
            }
          >
            {t('actions.export')}
          </Button>
          <Button onClick={() => navigate('add')} icon={<Plus color='white' />}>
            {t('clients.add')}
          </Button>
        </Flex>
      </div>

      {isLoading ? (
        <div className={styles.content}>
          <ProgressSpinner />
        </div>
      ) : !clients?.length && !search ? (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary text-center'>
            {t('clients.null')}
          </h2>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('clients.add')}
          </Button>
        </div>
      ) : (
        <ClientsTable
          clients={clients}
          onPageChange={onPageChange}
          onSortChange={handleSort}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
});

export default Clients;
