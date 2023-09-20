import React, { useEffect, useState } from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { IUser } from '@/models/IUser';

const AddClient: React.FC = observer(() => {
  const { t } = useTranslation();

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<IUser | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUserById = async (userId: number) => {
      try {
        const user = await clientsStore.getUserById(userId);
        console.log(user);

        setInitialValues(user);
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUserById(parseInt(id));
    }
  }, [id]);

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
});

export default AddClient;
