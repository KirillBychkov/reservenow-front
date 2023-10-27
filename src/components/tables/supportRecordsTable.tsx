import { ISupport } from '@/models/ISupport';
import classNames from 'classnames';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import { Button } from 'primereact/button';
import { getFormattedDate } from '@/utils/parseFormattedDate';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import supportRecordsStore from '@/store/SupportRecordsStore';
import { SortField, SortOrder } from '@/hooks/useSort';

interface Props {
  supportRecords: ISupport[];
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

    const supportRecordsData = useMemo(() => {
      return supportRecords.map((supportRecord) => {
        console.log(supportRecord.status);

        return {
          ...supportRecord,
          created_at: getFormattedDate(supportRecord.created_at, i18n.language),
        };
      });
    }, [i18n.language, supportRecords]);

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
                'states.showed'
              )} {first} - {last} ${t('states.of')} {totalRecords}`}
              style={{ justifyContent: 'flex-end' }}
              first={first}
              rows={supportRecordsStore.pagination.rowsPerPage}
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
            body={(rowData: ISupport) => (
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
  }
);

export default SupportRecordsTable;
