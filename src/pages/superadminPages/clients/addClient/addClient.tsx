import React, { useEffect, useState } from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm, {
  PlainClientInfo,
} from '@/components/forms/addClientForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { ProgressSpinner } from 'primereact/progressspinner';

const AddClient: React.FC = observer(() => {
  const { t } = useTranslation();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(!!id);
  const [initialValues, setInitialValues] = useState<
    PlainClientInfo | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserById = async (userId: number) => {
      try {
        setIsLoading(true);
        const user = await clientsStore.getPlainClientInfo(userId);
        setInitialValues(user);
      } catch (error) {
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
        {id && initialValues ? t('actions.editClient') : t('actions.addClient')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('clients.clients'), url: '/clients' },
          {
            label:
              id && initialValues
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
          <AddClientForm initialValues={id ? initialValues : undefined} />
        )}
      </div>
    </div>
  );
});

export default AddClient;
