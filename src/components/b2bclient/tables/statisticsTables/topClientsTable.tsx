import Button from '@/components/UI/buttons/button';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './statisticsTables.module.scss';
import classNames from 'classnames';
import { TopClient } from '@/models/Client';

interface Props {
  topClients: TopClient[];
}

const TopClientsTable: React.FC<Props> = ({ topClients }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewClient = (client: TopClient) => {
    navigate(`/clients/${client?.id || 1}`);
  };

  const formattedClients = topClients.map((object) => ({
    ...object,
    total_revenue: formatToUpperUnit(object.total_revenue),
  }));

  return (
    <div>
      <div className={classNames(styles.tableHeader, styles.topClientsTable)}>
        <h2 className='heading heading-4'>{t('clients.topClients')}</h2>
      </div>
      <DataTable
        className={classNames(
          'tableWithHeader tableWithoutFooter',
          styles.topClientsTable,
        )}
        removableSort
        value={formattedClients}
      >
        <Column field='id' header={t('objects.id')} sortable />
        <Column field='name' header={t('forms.firstName')} sortable />
        <Column
          sortable
          field='total_revenue'
          header={t('orders.totalReservationsSum')}
        />
        <Column
          header={t('actions.action')}
          body={(rowData: TopClient) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleViewClient(rowData)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default TopClientsTable;
