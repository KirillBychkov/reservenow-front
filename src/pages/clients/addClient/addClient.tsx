import React from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';
import { User } from '@/types/user';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { UserStatus } from '@/types/enums/user';

const AddClient: React.FC = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  // TODO: get user by id from Mobx store
  const initialValues = id
    ? ({
        firstName: 'Nazar',
        lastName: 'Vovk',
        id: 1,
        email: 'nvovk.2004@gmail.com',
        phone: '+380683036415',
        companyName: 'Ficus Technologies',
        status: UserStatus.PENDING,
        description: 'Lorem ipsum dolor sit amet',
      } as User)
    : undefined;

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
