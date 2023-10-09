import React, { useEffect, useState } from 'react';
import styles from './addOrganization.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import AddOrganizationForm, {
  AddOrganizationInfo,
} from '@/components/b2bclient/forms/addOrganizationForm/addOrganizationForm';

const AddOrganisation: React.FC = observer(() => {
  const { t } = useTranslation();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(!!id);
  const [initialValues, setInitialValues] = useState<
    AddOrganizationInfo | undefined
  >(undefined);

  useEffect(() => {}, []);

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
        {isLoading ? <ProgressSpinner /> : <AddOrganizationForm />}
      </div>
    </div>
  );
});

export default AddOrganisation;
