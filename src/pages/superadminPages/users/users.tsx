import React, { useContext } from 'react';
import styles from './users.module.scss';
import { Plus, Export } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UsersTable from '@/components/tables/usersTable';
import { observer } from 'mobx-react-lite';
import usersStore from '@/store/usersStore';
import { User } from '@/models/User';
import { ProgressSpinner } from 'primereact/progressspinner';
import Searchbar from '@/components/searchbar/searchbar';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';
import useSearch from '@/hooks/useSearch';

const Users: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);

  const { sortField, sortOrder, handleSort, sort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(usersStore.filters);
  const { search, handleSearch } = useSearch(onPageChange);

  const { data: users, isLoading } = useFetch<User[]>(
    () =>
      usersStore.getUsers({
        limit,
        skip,
        search,
        sort,
      }),
    [limit, skip, search, sort],
    { onError: showError },
  );

  return (
    <div className={styles.users}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
        <Searchbar
          searchPlaceholder={t('clients.searchPlaceholder')}
          setSearch={handleSearch}
        />
        <div className={styles.buttonGroup}>
          <Button
            icon={<Export color='white' />}
            severity='secondary'
            onClick={() =>
              usersStore.initiateExport({ limit, skip, search, sort })
            }
          >
            {t('actions.export')}
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
      ) : users?.length ? (
        <UsersTable
          users={users}
          onPageChange={onPageChange}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSort}
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

export default Users;
