import React, { useContext, useState } from 'react';
import styles from './users.module.scss';
import { Plus, Export } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UsersTable from '@/components/tables/usersTable';
import { observer } from 'mobx-react-lite';
import usersStore from '@/store/UsersStore';
import { IUser } from '@/models/IUser';
import { ProgressSpinner } from 'primereact/progressspinner';
import Searchbar from '@/components/searchbar/searchbar';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';

const Users: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);

  const [search, setSearch] = useState('');

  const { sortField, sortOrder, handleSort, sort } = useSort();

  const { limit, skip, first, onPageChange } = usePaginate(usersStore.filters);

  const {
    data: users,
    errorMsg,
    isLoading,
  } = useFetch<IUser[]>(
    () =>
      usersStore.getUsers({
        limit,
        skip,
        search,
        sort,
      }),
    [limit, skip, search, sort]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.users}>
      <h3 className='heading heading-3'>{t('clients.clients')}</h3>
      <div className={styles.controls}>
        <Searchbar setSearch={setSearch} />
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
