import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IAccount } from '@/models/IUser';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './clientsTable.module.scss';
import classNames from 'classnames';

interface ClientsTableProps {
  clients: IAccount[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleNavigate = (id: number) => {
    navigate(`${id}/edit`);
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedClients = clients.map((client) => {
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

  return (
    <div>
      <DataTable value={formattedClients}>
        <Column field='id' header='ID' sortable />
        <Column
          field='user.first_name'
          header={t('forms.firstName')}
          sortable
        />
        <Column field='user.last_name' header={t('forms.lastName')} sortable />
        <Column field='user.phone' header={t('forms.phone')} />
        <Column field='email' header={t('forms.email')} />
        <Column
          header={t('forms.status')}
          body={(rowData: IAccount) => (
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
          body={(rowData: IAccount) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.edit')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleNavigate(rowData.id)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default ClientsTable;
