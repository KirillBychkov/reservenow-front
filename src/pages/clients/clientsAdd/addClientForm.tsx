import React from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';

const AddClient = () => {
  return (
    <div className={styles.addClient}>
      <h3 className={classNames('heading-3', styles.heading)}>
        Додати клієнта
      </h3>
      <BreadCrumb
        model={[
          { label: 'Клієнти', url: '/clients' },
          { label: 'Додати клієнта', url: '/clients/add' },
        ]}
        home={{ icon: <Home color='gray' />, url: '/' }}
      />
      <div className={styles.formContainer}>
        <AddClientForm />
      </div>
    </div>
  );
};

export default AddClient;
