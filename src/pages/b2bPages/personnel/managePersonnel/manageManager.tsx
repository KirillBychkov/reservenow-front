import ToastContext from '@/context/toast';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './managePersonnel.module.scss';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import { ProgressSpinner } from 'primereact/progressspinner';
import ManageManagerForm from '@/components/forms/managePersonnelForms/manageManagerForm/manageManagerForm';
import { observer } from 'mobx-react-lite';
import useFetch from '@/hooks/useFetch';
import { Manager } from '@/models/Manager';
import personnelStore from '@/store/personnelStore';

const ManageManager: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();

  const { data: manager, isLoading } = useFetch<Manager>(
    () =>
      id
        ? personnelStore.getManager(parseInt(id))
        : Promise.resolve({ data: {} as Manager, error: '' }),
    [id],
    { onError: showError },
  );

  return (
    <div className={styles.addPersonnel}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {id ? t('personnel.edit') : t('personnel.add')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('personnel.personnel'), url: '/personnel' },
          id
            ? { label: t('actions.edit'), url: 'edit' }
            : { label: t('actions.add'), url: 'add' },
        ]}
      />
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <div className={styles.formContainer}>
          <ManageManagerForm
            initialValues={id ? manager ?? undefined : undefined}
          />
        </div>
      )}
    </div>
  );
});

export default ManageManager;
