import React, { useContext } from 'react';
import styles from './addClient.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import AddClientForm from '@/components/forms/addClientForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import clientsStore from '@/store/ClientsStore';
import { ProgressSpinner } from 'primereact/progressspinner';
import { PlainClientInfo } from '@/types/user';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';

const AddClient: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();

  const {
    data: initialValues,
    isLoading,
    errorMsg,
  } = useFetch<PlainClientInfo>(
    () =>
      id
        ? clientsStore.getPlainClientInfo(parseInt(id)) // if id is defined, get client info (Update mode)
        : Promise.resolve({ data: {} as PlainClientInfo, error: '' }), // else, return empty object (Add mode)
    [id]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

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
          <AddClientForm
            initialValues={id ? initialValues ?? undefined : undefined}
          />
        )}
      </div>
    </div>
  );
});

export default AddClient;
