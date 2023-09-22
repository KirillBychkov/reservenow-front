import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IAccount } from '@/models/IUser';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './clientsTable.module.scss';
import classNames from 'classnames';
import { IClient } from '@/models/response/GetUsersResponse';
import { useState } from 'react';

interface ClientsTableProps {
  clients: IClient[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const handleViewClient = (client: IClient) => {
    setSelectedClient(client);
    navigate(`${client.id}`);
  };

  const handleEditClient = (id: number) => {
    navigate(`${id}/edit`);
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedClients: IClient[] = clients.map((client) => {
    const date = new Date(client.created_at);
    const formattedDate = new Intl.DateTimeFormat(
      i18n.language,
      options
    ).format(date);

    return {
      ...client,
      created_at_string: formattedDate,
    };
  });
  // console.log(formattedClients[0]);

  return (
    <div>
      <DataTable
        removableSort
        value={formattedClients}
        selectionMode='single'
        selection={selectedClient!}
        onSelectionChange={(e) => handleViewClient(e.value)}
      >
        <Column field='id' header='ID' sortable />
        <Column field='first_name' header={t('forms.firstName')} sortable />
        <Column field='last_name' header={t('forms.lastName')} sortable />
        <Column field='phone' header={t('forms.phone')} />
        <Column field='account.email' header={t('forms.email')} />
        <Column
          header={t('forms.status')}
          body={(rowData: IClient) => (
            <div
              className={classNames(
                styles.status,
                styles[rowData.account.status]
              )}
            >
              {t(`status.${rowData.account.status}`)}
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
};

export default ClientsTable;
