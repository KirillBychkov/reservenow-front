import Flex from '@/components/UI/layout/flex';
import { Home } from '@blueprintjs/icons';
import { BreadCrumb } from 'primereact/breadcrumb';
import styles from './manageClient.module.scss';
import { observer } from 'mobx-react-lite';
import ManageClientForm from '@/components/forms/manageClientForm/manageClientForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import ToastContext from '@/context/toast';
import useFetch from '@/hooks/useFetch';
import { Client } from '@/models/Client';
import clientStore from '@/store/ClientStore';
import { ProgressSpinner } from 'primereact/progressspinner';

const ManageClient = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { data: initialValues, isLoading } = useFetch<Client>(
    () =>
      id
        ? clientStore.getClientById(parseInt(id))
        : Promise.resolve({ data: {} as Client, error: '' }),
    [id],
    { onError: showError },
  );
  const isEditingMode = id && initialValues;

  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.pageBody}>
      <Flex options={{ direction: 'column', gap: 0.625 }}>
        <h3 className='heading heading-3'>
          {isEditingMode ? t('clients.edit') : t('clients.add')}
        </h3>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('clients.clients'), url: '/clients' },
            {
              label: isEditingMode
                ? String(initialValues.id)
                : t('clients.add'),
              disabled: true,
            },
          ]}
        />
      </Flex>
      <div className={styles.form}>
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <ManageClientForm initValues={initialValues || undefined} />
        )}
      </div>
    </Flex>
  );
});

export default ManageClient;
