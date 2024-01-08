import Button from '@/components/UI/buttons/button';
import { SortField, SortOrder } from '@/hooks/useSort';
import { Order } from '@/models/Order';
import ordersStore from '@/store/ordersStore';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './status.module.scss';
import { getAllObjectsNamesInOrder } from './helper';

type Props = {
  orders: Order[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
};

const OrdersHistoryTable: React.FC<Props> = observer(
  ({ orders, onPageChange, first, sortField, sortOrder, onSortChange }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const filters = ordersStore.filters;

    const handleNavigateToOrderPage = (id: number) => {
      navigate(`${id}`);
    };

    const formattedOrders = orders.map((order) => {
      return {
        ...formatObjectIn(order),
        client: formatObjectIn(order.client),
      };
    });

    return (
      <div>
        <DataTable
          removableSort
          value={formattedOrders}
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
              rows={ordersStore.filters.limit}
              totalRecords={filters.total}
              onPageChange={onPageChange}
            />
          }
        >
          <Column
            style={{ maxWidth: '60px' }}
            field='id'
            header={t('reservationHistory.table.id')}
            sortable
          />
          <Column
            field='name'
            style={{ maxWidth: '120px' }}
            header={t('reservationHistory.table.clientName')}
            body={({ client }: Order) => {
              return `${client.first_name} ${client.last_name}`;
            }}
            sortable
          />
          <Column
            style={{ maxWidth: '120px' }}
            field='client.phone'
            header={t('reservationHistory.table.phone')}
          />
          <Column
            style={{ maxWidth: '450px' }}
            header={t('reservationHistory.table.reservations')}
            body={(order: Order) =>
              getAllObjectsNamesInOrder(order).join(', ')
            }
          />
          <Column
            style={{ maxWidth: '120px' }}
            field='created_at'
            header={t('reservationHistory.table.createdAt')}
            sortable
          />
          <Column
            style={{ maxWidth: '120px' }}
            field='order_sum'
            header={t('reservationHistory.table.orderSum')}
            sortable
          />
          <Column
            style={{ maxWidth: '120px' }}
            header={t('reservationHistory.table.manager')}
            body={({ user }: Order) => {
              return `${user.first_name} ${user.last_name}`;
            }}
          />
          <Column
            style={{ maxWidth: '120px' }}
            header={t('reservationHistory.table.status')}
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
                style={{ maxHeight: '1.5rem' }}
                label={t('actions.open')}
                size='small'
                rounded
                onClick={() => handleNavigateToOrderPage(id)}
                severity='secondary'
              />
            )}
          />
        </DataTable>
      </div>
    );
  },
);

export default OrdersHistoryTable;
