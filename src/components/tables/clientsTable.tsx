import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IUser } from '@/models/IUser';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from '@blueprintjs/icons';
interface ClientsTableProps {
  clients: IUser[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  console.log(i18n.language);

  const handleNavigate = (id: number) => {
    navigate(`${id}/edit`);
  };

  // Define options for date formatting (locale and style)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Use "long" for the full month name
    day: 'numeric',
  };

  const formattedClients = clients.map((client) => {
    const date = new Date(client.created_at);
    const formattedDate = new Intl.DateTimeFormat(
      i18n.language,
      options
    ).format(date);

    // Create a new object with the formatted date
    return {
      ...client,
      created_at_string: formattedDate,
    };
  });

  return (
    <div>
      <DataTable
        value={formattedClients}
        // sortIcon={<ChevronDown className='p-icon p-sortable-column-icon' />}
        // sortIcon={<ChevronDown />}
      >
        <Column field='id' header='ID' sortable></Column>
        <Column field='first_name' header='Name' sortable></Column>
        <Column field='last_name' header='Surname' sortable></Column>
        <Column field='phone' header='Phone'></Column>
        <Column field='created_at_string' header='Created At' sortable></Column>
        <Column
          header='Actions'
          body={(
            rowData: IUser // Create a custom column with a button
          ) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.edit')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleNavigate(rowData.id)} // Call the onEditClient function with the client ID
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default ClientsTable;
