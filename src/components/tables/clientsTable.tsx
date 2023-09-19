import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IUser } from '@/models/IUser';

interface ClientsTableProps {
  clients: IUser[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  console.log(clients);

  return (
    <div>Table</div>
    // <DataTable value={clients} tableStyle={{ minWidth: '50rem' }}>
    //   <Column field='id' header='ID'></Column>
    //   <Column field='first_name' header='First Name'></Column>
    //   <Column field='last_name' header='Last Name'></Column>
    //   <Column field='email' header='Email'></Column>
    //   <Column field='phone' header='Phone'></Column>
    //   <Column field='domain_url' header='Company Name'></Column>
    //   <Column field='description' header='Description'></Column>
    //   <Column field='status' header='Status'></Column>
    // </DataTable>
  );
};

export default ClientsTable;
