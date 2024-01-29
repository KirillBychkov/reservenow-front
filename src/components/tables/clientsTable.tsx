import { SortField, SortOrder } from '@/hooks/useSort';
import { Client } from '@/models/Client';
import clientStore from '@/store/clientStore';
import { observer } from 'mobx-react-lite';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './status.module.scss';
import classNames from 'classnames';
import Button from '../UI/buttons/button';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import Paginator from '../UI/paginator/paginator';
import { TableEmptyMessage } from '../UI/tableEmptyMessage/tableEmptyMessage';
import dayjs from 'dayjs';
import { formatCreatedAtTable } from '@/utils/formatters/formatDate';

type Props = {
  clients: Client[] | null;
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
    dayjs.locale(i18n.language);
    const navigate = useNavigate();
    const filters = clientStore.getFilters();

    const handleNavigateToClientPage = (id: number) => {
      navigate(`${id}`);
    };

    const formattedClients = clients?.map((client) => ({
      ...formatObjectIn(client, i18n.language),
      created_at: formatCreatedAtTable(client, i18n.language),
    }));

    return (
      <DataTable
        removableSort
        value={formattedClients}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSortChange}
        scrollable
        lazy
        emptyMessage={<TableEmptyMessage text={t('invalid.search')} />}
        footer={
          <Paginator
            first={first}
            rows={filters.limit}
            totalRecords={filters.total}
            onPageChange={onPageChange}
          />
        }
      >
        <Column
          field='id'
          style={{ minWidth: '80px' }}
          header={t('clients.idColumn')}
          sortable
        />
        <Column
          style={{ minWidth: '167px' }}
          sortField='first_name'
          header={t('clients.nameColumn')}
          body={({ first_name, last_name }: Client) =>
            `${first_name} ${last_name}`
          }
          sortable
        />
        <Column
          style={{ minWidth: '166px' }}
          field='phone'
          header={t('clients.phoneColumn')}
        />
        <Column
          style={{ minWidth: '112px' }}
          field='total_reservation_amount'
          header={t('clients.reservationColumn')}
        />
        <Column
          style={{ minWidth: '204px' }}
          sortField='total_reservation_sum'
          header={t('clients.moneyColumn')}
          sortable
          body={({ total_reservation_sum }: Client) =>
            `UAH ${formatToUpperUnit(total_reservation_sum || 0)}`
          }
        />

        <Column
          style={{ minWidth: '128px' }}
          header={t('forms.status')}
          body={({ status }: Client) => (
            <div className={classNames(styles.status, styles[status])}>
              {t(`status.${status}`)}
            </div>
          )}
        />

        <Column
          style={{ minWidth: '140px' }}
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
