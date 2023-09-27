import { ISupport } from '@/models/ISupport';
import classNames from 'classnames';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import { Button } from 'primereact/button';

interface Props {
  supportRecords: ISupport[];
}

const SupportRecordsTable: React.FC<Props> = ({ supportRecords }) => {
  const { t } = useTranslation();
  //TODO: Add date to string formatter, navigate to support record

  return (
    <div>
      <DataTable removableSort>
        <Column field='id' header='ID' sortable />
        <Column field='user.account.email' header={t('forms.email')} />
        <Column
          header={t('forms.status')}
          body={(rowData: ISupport) => (
            <div className={classNames(styles.status, styles[rowData.status])}>
              {t(`status.${rowData.user.account.status}`)}
            </div>
          )}
        />
        <Column field='created_at' header={t('dates.createdAt')} sortable />
        <Column
          header={t('actions.actions')}
          body={() => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              // onClick={}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default SupportRecordsTable;
