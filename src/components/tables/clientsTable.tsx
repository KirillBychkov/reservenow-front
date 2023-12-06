import { SortField, SortOrder } from '@/hooks/useSort';
import { Client } from '@/models/Client';
import clientStore from '@/store/ClientStore';
import { observer } from 'mobx-react-lite';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './status.module.scss';
import classNames from 'classnames';
import Button from '../UI/buttons/button';
import { formatDate } from '@/utils/formatters/formatDate';

type Props = {
  clients: Client[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
};

const ClientsTable = observer(
  ({
    clients,
    sortField,
    sortOrder,
    onSortChange,
    first,
    onPageChange,
  }: Props) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const filters = clientStore.getFilters();

    const handleNavigateToClientPage = (id: number) => {
      navigate(`${id}`);
    };

    const formattedClients: Client[] = useMemo(() => {
      return clients.map((client) => {
        const formattedDate = formatDate(client.created_at, i18n.language);

        return {
          ...client,
          created_at: formattedDate,
        };
      });
    }, [clients, i18n.language]);

    return (
      <DataTable
        removableSort
        value={formattedClients}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSortChange}
        lazy
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
            rows={filters.limit}
            totalRecords={filters.total}
            onPageChange={onPageChange}
          />
        }
      >
        <Column field='id' header={t('clients.idColumn')} sortable />
        <Column field='first_name' header={t('clients.nameColumn')} sortable />
        <Column field='phone' header={t('clients.phoneColumn')} />
        <Column
          field='total_reservation_amount'
          header={t('clients.reservationColumn')}
        />
        <Column
          field='total_reservation_sum'
          header={t('clients.moneyColumn')}
        />

        <Column
          header={t('forms.status')}
          body={({ status }: Client) => (
            <div className={classNames(styles.status, styles[status])}>
              {t(`status.${status}`)}
            </div>
          )}
        />

        <Column
          field='created_at'
          sortable
          header={t('clients.createdColumn')}
        />

        <Column
          header={t('actions.actions')}
          body={(rowData: Client) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleNavigateToClientPage(rowData.id)}
            />
          )}
        />
      </DataTable>
    );
  },
);

export default ClientsTable;
