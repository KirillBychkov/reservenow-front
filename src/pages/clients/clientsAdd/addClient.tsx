import React from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';
import { User, UserStatus } from '@/types/user';
interface AddClientProps {
  initialValues?: User;
}

const AddClient: React.FC<AddClientProps> = ({ initialValues }) => {
  initialValues = {
    firstName: 'Nazar',
    lastName: 'Vovk',
    id: 1,
    email: 'nvovk.2004@gmail.com',
    phone: '0683036415',
    companyName: 'Ficus Technologies',
    status: UserStatus.PENDING,
  };

  return (
    <div className={styles.addClient}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {initialValues ? 'Редагувати клієнта' : 'Додати клієнта'}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: 'Клієнти', url: '/clients' },
          {
            label: initialValues
              ? `${initialValues?.firstName} ${initialValues?.lastName}`
              : 'Додати клієнта',
            url: '/clients/add',
          },
        ]}
      />
      <div className={styles.formContainer}>
        <AddClientForm initialValues={initialValues} />
      </div>
    </div>
  );
};

export default AddClient;
