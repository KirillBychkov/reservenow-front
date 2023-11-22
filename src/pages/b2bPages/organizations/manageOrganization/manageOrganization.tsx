import React, { useContext } from 'react';
import styles from './manageOrganization.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import useFetch from '@/hooks/useFetch';
import organizationStore from '@/store/OrganizationsStore';
import ToastContext from '@/context/toast';
import ManageOrganizationForm from '@/components/b2bclient/forms/manageOrganizationForm/manageOrganizationForm';
import { IOrganization } from '@/models/IOrganization';

const ManageOrganisation: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();

  const {
    data: organization,
    isLoading,
    errorMsg,
  } = useFetch(
    () =>
      id
        ? organizationStore.getOrganizationById(parseInt(id || '0'))
        : Promise.resolve({ data: {} as IOrganization, error: '' }),
    [id]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.AddOrganization}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {t('organizations.add')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('organizations.organizations'), url: '/organizations' },
          {
            label: t('organizations.add'),
            url: '/organizations/add',
          },
        ]}
      />
      <div className={styles.formContainer}>
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <ManageOrganizationForm
            initialValues={id ? organization ?? undefined : undefined}
          />
        )}
      </div>
    </div>
  );
});

export default ManageOrganisation;
