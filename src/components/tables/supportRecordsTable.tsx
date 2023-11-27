import { Support } from '@/models/Support';
import classNames from 'classnames';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import { Button } from 'primereact/button';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import supportRecordsStore from '@/store/SupportRecordsStore';
import { SortField, SortOrder } from '@/hooks/useSort';

interface Props {
  supportRecords: Support[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
}

const SupportRecordsTable: React.FC<Props> = observer(
  ({
    supportRecords,
    first,
    onPageChange,
    sortField,
    sortOrder,
    onSortChange,
  }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const filters = supportRecordsStore.getFilters();

    const handleOpenSupportRecord = (id: number) => {
      navigate(`${id}`);
    };

    const supportRecordsData = supportRecords.map((supportRecord) => ({
      ...supportRecord,
      created_at: getFormattedDate(supportRecord.created_at, i18n.language),
    }));

    return (
      <div>
        <DataTable
          value={supportRecordsData}
          removableSort
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
              rows={supportRecordsStore.filters.limit}
              totalRecords={filters.total}
              onPageChange={onPageChange}
            />
          }
        >
          <Column field='id' header='ID' sortable />
          <Column field='user.first_name' header={t('forms.firstName')} />
          <Column field='user.last_name' header={t('forms.lastName')} />
          <Column field='user.account.email' header={t('forms.email')} />
          <Column
            header={t('forms.status')}
            body={(rowData: Support) => (
              <div
                className={classNames(styles.status, styles[rowData.status])}
              >
                {t(`status.${rowData.status}`)}
              </div>
            )}
          />
          <Column field='created_at' header={t('dates.createdAt')} sortable />
          <Column
            header={t('actions.actions')}
            body={(rowData: Support) => (
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
  },
);

export default SupportRecordsTable;
