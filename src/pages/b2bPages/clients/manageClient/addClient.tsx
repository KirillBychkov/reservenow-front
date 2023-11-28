import Flex from '@/components/UI/layout/flex';
import { Home } from '@blueprintjs/icons';
import { BreadCrumb } from 'primereact/breadcrumb';
import styles from './manageClient.module.scss';
import AddClientForm from '@/components/b2bclient/forms/manageClientForms/addClientForm';

const AddClient = () => {
  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.pageBody}>
      <Flex options={{ direction: 'column', gap: 0.625 }}>
        <h3 className='heading heading-3'>Додати клієнта</h3>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: 'Клієнти', url: '/clients' },
            {
              label: 'Додати клієнта',
              disabled: true,
            },
          ]}
        />
      </Flex>
      <div className={styles.form}>
        <AddClientForm />
      </div>
    </Flex>
  );
};

export default AddClient;
