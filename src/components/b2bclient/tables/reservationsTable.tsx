import React from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Order } from '@/models/Order';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import styles from '@/components/tables/status.module.scss';
import classNames from 'classnames';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { SortField, SortOrder } from '@/hooks/useSort';
import ordersStore from '@/store/ordersStore';
import Paginator from '@/components/UI/paginator/paginator';
import { formatPhoneIn } from '@/utils/formatters/formatPhone';

type Props = {
  orders: Order[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
  emptyMessage?: React.ReactNode;
};

const OrdersTable: React.FC<Props> = observer(
  ({
    orders,
    first,
    onPageChange,
    sortField,
    sortOrder,
    onSortChange,
    emptyMessage,
  }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const filters = ordersStore.filters;

    const handleViewOrder = (object: Order) => {
      navigate(`/booking/${object.id}`);
    };

    const formattedObjects = orders.map((order) =>
      formatObjectIn(order, i18n.language),
    );

    return (
      <DataTable
        className={classNames('tableWithHeader', {
          emptyTable: formattedObjects.length === 0,
        })}
        removableSort
        value={formattedObjects}
        emptyMessage={emptyMessage}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSortChange}
        lazy={true}
        footer={
          <Paginator
            first={first}
            rows={ordersStore.filters.limit}
            totalRecords={filters.total}
            onPageChange={onPageChange}
          />
        }
      >
        <Column field='id' header={t('objects.id')} />
        <Column
          header={t('forms.firstName')}
          body={({ client }: Order) => (
            <>{`${client.first_name} ${client.last_name}`}</>
          )}
        />
        <Column
          field='client.phone'
          header={t('forms.phone')}
          body={({ client }: Order) => formatPhoneIn(client.phone)}
        />
        <Column field='order_sum' header={t('forms.total')} sortable />
        <Column
          header={t('forms.status')}
          body={(rowData: Order) => (
            <div className={classNames(styles.status, styles[rowData.status])}>
              {t(`status.${rowData.status}`)}
            </div>
          )}
        />
        <Column field='created_at' header={t('dates.date')} sortable />
        <Column
          header={t('actions.action')}
          body={(rowData: Order) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleViewOrder(rowData)}
            />
          )}
        />
      </DataTable>
    );
  },
);

export default OrdersTable;
