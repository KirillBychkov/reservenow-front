import Button from '@/components/UI/buttons/button';
import { TopObject } from '@/models/RentalObject';
import { formatToUpperUnit } from '@/utils/formatters/formatPrice';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import styles from './statisticsTables.module.scss';
import classNames from 'classnames';

interface Props {
  topObjects: TopObject[];
  organizationId: number;
}

const TopObjectsTable: React.FC<Props> = ({ topObjects, organizationId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewObject = (object: TopObject) => {
    navigate(`/organizations/${organizationId}/objects/${object.id}`);
  };

  const formattedObjects = topObjects.map((object) => ({
    ...object,
    total_revenue: formatToUpperUnit(object.total_revenue),
  }));

  return (
    <div>
      <div className={styles.tableHeader}>
        <h2 className='heading heading-4'>{t('objects.topObjects')}</h2>
      </div>
      <DataTable
        className={classNames('tableWithHeader tableWithoutFooter')}
        removableSort
        value={formattedObjects}
        emptyMessage={t('invalid.search')}
      >
        <Column field='id' header={t('objects.id')} sortable />
        <Column field='name' header={t('objects.name')} sortable />
        <Column
          field='total_reservations'
          header={t('orders.totalReservations')}
        />
        <Column
          sortable
          field='total_revenue'
          header={t('orders.totalReservationsSum')}
        />
        <Column
          header={t('objects.load')}
          sortable
          sortField='load'
          body={(rowData: TopObject) => (
            <>
              <p className='paragraph paragraph--normal'>{`${Math.round(
                rowData.load,
              )}%`}</p>
              <ProgressBar
                value={rowData.load}
                showValue={false}
                style={{ height: '0.25rem', width: '7.8125rem' }}
                pt={{
                  value: {
                    style: { borderRadius: '0.94rem' },
                  },
                }}
              />
            </>
          )}
        />
        <Column
          header={t('actions.action')}
          body={(rowData: TopObject) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleViewObject(rowData)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default TopObjectsTable;
