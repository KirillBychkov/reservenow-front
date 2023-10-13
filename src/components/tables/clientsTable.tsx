import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IAccount } from '@/models/IUser';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './status.module.scss';
import classNames from 'classnames';
import { IUser } from '@/models/IUser';
import { useMemo, useState } from 'react';
import { getFormattedDate } from '@/utils/parseFormattedDate';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import clientsStore from '@/store/ClientsStore';
import { observer } from 'mobx-react-lite';

interface Props {
  clients: IUser[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
}

const ClientsTable: React.FC<Props> = observer(
  ({ clients, onPageChange, first }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [selectedClient, setSelectedClient] = useState<IUser | null>(null);
    const filters = clientsStore.getFilters();

    const handleViewClient = (client: IUser) => {
      setSelectedClient(client);
      navigate(`${client.id}`);
    };

    const handleEditClient = (id: number) => {
      navigate(`${id}/edit`);
    };

    const formattedClients: IUser[] = useMemo(() => {
      return clients.map((client) => {
        const formattedDate = getFormattedDate(
          client.created_at,
          i18n.language
        );

        return {
          ...client,
          created_at_string: formattedDate,
        };
      });
    }, [clients, i18n.language]);

    return (
      <div>
        <DataTable
          removableSort
          value={formattedClients}
          selectionMode='single'
          selection={selectedClient!}
          onSelectionChange={(e) => handleViewClient(e.value)}
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
              rows={clientsStore.pagination.rowsPerPage}
              totalRecords={filters.total}
              onPageChange={onPageChange}
            />
          }
        >
          <Column field='id' header='ID' sortable />
          <Column field='first_name' header={t('forms.firstName')} sortable />
          <Column field='last_name' header={t('forms.lastName')} sortable />
          <Column field='phone' header={t('forms.phone')} />
          <Column field='account.email' header={t('forms.email')} />
          <Column
            header={t('forms.status')}
            body={(rowData: IUser) => (
              <div
                className={classNames(
                  styles.status,
                  styles[rowData?.account?.status]
                )}
              >
                {t(`status.${rowData?.account?.status}`)}
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
            body={(rowData: IAccount) => (
              <Button
                style={{ maxHeight: '1.5rem' }}
                label={t('actions.edit')}
                size='small'
                rounded
                severity='secondary'
                onClick={() => handleEditClient(rowData.id)}
              />
            )}
          />
        </DataTable>
      </div>
    );
  }
);

export default ClientsTable;
