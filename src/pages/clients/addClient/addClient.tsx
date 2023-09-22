import React, { useEffect, useMemo, useState } from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm, {
  AddClientInitialValues,
} from '@/components/forms/addClientForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { IAccount } from '@/models/IUser';
import { UserStatus } from '@/types/user';
import { ProgressSpinner } from 'primereact/progressspinner';

const AddClient: React.FC = observer(() => {
  const { t } = useTranslation();

  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<IAccount | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(!!id);

  const formProps: AddClientInitialValues = useMemo(
    () => ({
      id: initialValues?.id,
      email: initialValues?.email || '',
      status: initialValues?.status || UserStatus.PENDING,
      firstName: initialValues?.user?.first_name || '',
      lastName: initialValues?.user?.last_name || '',
      phone: initialValues?.user?.phone || '',
      companyName: initialValues?.user?.domain_url || '',
      description: initialValues?.user?.description || '',
    }),
    [initialValues]
  );

  useEffect(() => {
    const fetchUserById = async (userId: number) => {
      try {
        setIsLoading(true);
        const user = await clientsStore.getUserById(userId);
        setInitialValues(user);
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
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
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <AddClientForm initialValues={id ? formProps : undefined} />
        )}
      </div>
    </div>
  );
});

export default AddClient;
