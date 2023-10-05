import React, { useEffect, useMemo } from 'react';
import styles from './viewOrganization.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import organisationStore from '@/store/OrganizationsStore';
import organizationStore from '@/store/OrganizationsStore';
import Button from '@/components/UI/buttons/button';

const ViewOrganisation: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    organisationStore.getOrganizations();
  }, []);

  const organization = organizationStore.organizations?.find(
    (org) => org.id === (id ? parseInt(id, 10) : undefined)
  );
  // if (!organization) {
  // }

  // const OrganizationInfo = useMemo(() => {
  //   if (!organization) return null;
  //   // Render org details here
  //   // organization.name etc.
  // }, [organization]);
  return (
    <div className={styles['Vieworganizations']}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {organization?.name}
      </h3>
      <div className={styles['Vieworganizations-Heading']}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('organizations.organizations'), url: '/organizations' },
            {
              label: `${organization?.name}`,
              url: `/organizations/${organization?.id}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
    </div>
  );
});

export default ViewOrganisation;
