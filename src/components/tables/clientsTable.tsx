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

interface Props {
  clients: IUser[];
  // setPage: (page: number) => void;
}

const ClientsTable: React.FC<Props> = ({ clients }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedClient, setSelectedClient] = useState<IUser | null>(null);

  const handleViewClient = (client: IUser) => {
    setSelectedClient(client);
    navigate(`${client.id}`);
  };

  const handleEditClient = (id: number) => {
    navigate(`${id}/edit`);
  };

  const formattedClients: IUser[] = useMemo(() => {
    return clients.map((client) => {
      const formattedDate = getFormattedDate(client.created_at, i18n.language);

      return {
        ...client,
        created_at_string: formattedDate,
      };
    });
  }, [clients, i18n.language]);

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(8);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

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
            first={first}
            rows={rows}
            totalRecords={120}
            onPageChange={onPageChange}
          />
        }
        // paginator
        // totalRecords={64}
        // rows={8}
        // pageLinkSize={8}
        // alwaysShowPaginator={true}
        // paginatorTemplate='PrevPageLink PageLinks NextPageLink'
        // onPage={(e: DataTableStateEvent) => setPage((e.page || 0) + 1)}
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
        <Paginator></Paginator>
      </DataTable>
    </div>
  );
};

export default ClientsTable;
