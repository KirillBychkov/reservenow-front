import React from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';
import { User } from '@/types/user';
import { useTranslation } from 'react-i18next';
interface AddClientProps {
  initialValues?: User;
}

const AddClient: React.FC<AddClientProps> = ({ initialValues }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.addClient}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {initialValues ? t('actions.editClient') : t('actions.addClient')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('clients.clients'), url: '/clients' },
          {
            label: initialValues
              ? `${initialValues.id}`
              : t('actions.addClient'),
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
