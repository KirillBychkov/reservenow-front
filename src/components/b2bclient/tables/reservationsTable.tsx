import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { formatDate } from '@/utils/formatters/formatDate';
import { Order } from '@/models/Order';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import styles from '@/components/tables/status.module.scss';
import classNames from 'classnames';

type Props = {
  orders: Order[];
};

const OrdersTable: React.FC<Props> = observer(({ orders }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // const [selectedObject, setSelectedObject] = useState<RentalObject | null>(null);
  // const filters = objectsStore.getFilters;

  // const handleViewObject = (object: RentalObject) => {
  //   setSelectedObject(object);
  //   navigate(`objects/${object.id}`);
  // };

  // const handleEditObject = (object: RentalObject) => {
  //   navigate(`objects/${object.id}/edit`);
  // };

  const formattedObjects = orders.map((order) => ({
    ...order,
    created_at: formatDate(order.created_at, i18n.language),
    reservations: order.reservations.map((reservation) => {
      return formatObjectIn(reservation);
    }),
  }));

  return (
    <DataTable
      className='customObjectTable'
      removableSort
      value={formattedObjects}
      selectionMode='single'
      // selection={selectedObject}
      // onSelectionChange={(e) => {
      //   handleViewObject(e.value as RentalObject);
      // }}
      // footer={
      //   <Paginator
      //     template={{
      //       layout:
      //         'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      //     }}
      //     currentPageReportTemplate={`${t(
      //       'states.showed',
      //     )} {first} - {last} ${t('states.of')} {totalRecords}`}
      //     style={{ justifyContent: 'flex-end' }}
      //     first={first}
      //     rows={objectsStore.filters.limit}
      //     totalRecords={filters.total}
      //     onPageChange={onPageChange}
      //   />
      // }
    >
      <Column field='id' header={t('objects.id')} />
      <Column
        header={t('forms.firstName')}
        body={({ client }: Order) => (
          <>{`${client.first_name} ${client.last_name}`}</>
        )}
      />
      <Column field='client.phone' header={t('forms.phone')} />
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
            // onClick={() => handleEditObject(rowData)}
          />
        )}
      />
    </DataTable>
  );
});

export default OrdersTable;
