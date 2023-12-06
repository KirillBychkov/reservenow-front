import { SortField, SortOrder } from '@/hooks/useSort';
import { Order } from '@/models/Order';
import clientStore from '@/store/ClientStore';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/buttons/button';
import { useMemo } from 'react';
import { formatDate } from '@/utils/formatters/formatDate';
import classNames from 'classnames';
import styles from './status.module.scss'

type Props = {
  orders: Order[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
};

const getAllObjectsNamesInOrder = ({ reservations }: Order) => {
  return reservations.map((reservation) => {
    return (
      reservation.equipment?.name ||
      reservation.rental_object?.name ||
      reservation.trainer?.first_name
    );
  });
};

const ClientOrdersTable = ({
  orders,
  first,
  sortField,
  sortOrder,
  onPageChange,
  onSortChange,
}: Props) => {
  const filters = clientStore.getOrdersFilters();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToOrder = (id: number) => {
    //Todo add link to reservation history page
    // navigate(`/reservations/${id}`);
  };

  const formattedOrders: Order[] = useMemo(() => {
    return orders.map((order) => {
      const formattedDate = formatDate(order.created_at, i18n.language);

      return {
        ...order,
        created_at: formattedDate,
      };
    });
  }, [orders, i18n.language]);

  return (
    <DataTable
      removableSort
      value={formattedOrders}
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
      <Column header={t('orders.id')} field='id' />
      <Column
        header={t('orders.objectNames')}
        style={{ width: '30%' }}
        body={(order: Order) => getAllObjectsNamesInOrder(order)}
      />

      <Column header={t('orders.clientPhone')} field='client.phone' />
      <Column header={t('orders.create_at')} field='created_at' sortable />
      <Column header={t('orders.totalOrderSum')} field='order_sum' />
      <Column
        header={t('orders.status')}
        field='status'
        sortable
        body={({ status }: Order) => (
          <div className={classNames(styles.status, styles[status])}>
            {t(`status.${status}`)}
          </div>
        )}
      />
      <Column
        header={t('actions.action')}
        body={({ id }: Order) => (
          <Button
            label={t('actions.open')}
            style={{ maxHeight: '1.5rem' }}
            size='small'
            rounded
            severity='secondary'
            onClick={() => handleNavigateToOrder(id)}
          />
        )}
      />
    </DataTable>
  );
};

export default ClientOrdersTable;
