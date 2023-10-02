import { ISupport } from '@/models/ISupport';
import classNames from 'classnames';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import { Button } from 'primereact/button';
import { getFormattedDate } from '@/utils/parseFormattedDate';
import { useNavigate } from 'react-router-dom';

interface Props {
  supportRecords: ISupport[];
}

const SupportRecordsTable: React.FC<Props> = ({ supportRecords }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleOpenSupportRecord = (id: number) => {
    navigate(`${id}`);
  };

  const supportRecordsData = useMemo(() => {
    return supportRecords.map((supportRecord) => {
      return {
        ...supportRecord,
        created_at_string: getFormattedDate(
          supportRecord.created_at,
          i18n.language
        ),
      };
    });
  }, [i18n.language, supportRecords]);

  return (
    <div>
      <DataTable value={supportRecordsData} removableSort>
        <Column field='id' header='ID' sortable />
        {/* <Column field='user.account.email' header={t('forms.email')} /> */}
        <Column
          header={t('forms.status')}
          body={(rowData: ISupport) => (
            <div className={classNames(styles.status, styles[rowData.status])}>
              {t(`status.${rowData.status}`)}
            </div>
          )}
        />
        <Column
          field='created_at_string'
          header={t('dates.createdAt')}
          sortable
        />
        <Column
          header={t('actions.actions')}
          body={(rowData: ISupport) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleOpenSupportRecord(rowData.id)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default SupportRecordsTable;
