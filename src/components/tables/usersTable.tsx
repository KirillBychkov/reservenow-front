import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Account } from '@/models/User';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import classNames from 'classnames';
import { User } from '@/models/User';
import { useState } from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import usersStore from '@/store/usersStore';
import { observer } from 'mobx-react-lite';
import { SortField, SortOrder } from '@/hooks/useSort';
import { formatObjectIn } from '@/utils/formatters/formatObject';

interface Props {
  users: User[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
}

const UsersTable: React.FC<Props> = observer(
  ({ users, onPageChange, first, sortField, sortOrder, onSortChange }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const filters = usersStore.getFilters();

    const handleViewUser = (user: User) => {
      setSelectedUser(user);
      navigate(`${user.id}`);
    };

    const handleEditUser = (id: number) => {
      navigate(`${id}/edit`);
    };

    const formattedUsers: User[] = users.map((user) =>
      formatObjectIn(user, i18n.language),
    );

    return (
      <div>
        <DataTable
          removableSort
          value={formattedUsers}
          selectionMode='single'
          selection={selectedUser!}
          onSelectionChange={(e) => handleViewUser(e.value)}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSortChange}
          lazy={true}
          footer={
            <Paginator
              template={{
                layout:
                  'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              }}
              currentPageReportTemplate={`${t(
                'states.showed',
              )} {first} - {last} ${t('states.of')} {totalRecords}`}
              style={{ justifyContent: 'flex-end' }}
              first={first}
              rows={usersStore.filters.limit}
              totalRecords={filters.total}
              onPageChange={onPageChange}
            />
          }
        >
          <Column field='id' header='ID' sortable />
          <Column field='first_name' header={t('forms.firstName')} sortable />
          <Column field='last_name' header={t('forms.lastName')} sortable />
          <Column field='phone' header={t('forms.phone')} />
          <Column field='account.email' header={t('forms.email')} />
          <Column
            header={t('forms.status')}
            body={(rowData: User) => (
              <div
                className={classNames(
                  styles.status,
                  styles[rowData?.account?.status],
                )}
              >
                {t(`status.${rowData?.account?.status}`)}
              </div>
            )}
          />
          <Column header={t('dates.createdAt')} field='created_at' sortable />
          <Column
            header={t('actions.actions')}
            body={(rowData: Account) => (
              <Button
                style={{ maxHeight: '1.5rem' }}
                label={t('actions.edit')}
                size='small'
                rounded
                severity='secondary'
                onClick={() => handleEditUser(rowData.id)}
              />
            )}
          />
        </DataTable>
      </div>
    );
  },
);

export default UsersTable;
