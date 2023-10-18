import React, { useEffect } from 'react';
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
import { ProgressSpinner } from 'primereact/progressspinner';
import ViewStatsLayout from '@/components/UI/layout/ViewStatsLayout';
import LeftSideComponent from '@/components/b2bclient/organizations/LeftSideComponent';
import RightSideComponent from '@/components/b2bclient/organizations/RightSideComponent';

const ViewOrganization: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    organisationStore.getOrganizations();
    // store get objects and pass it to the table
  }, []);

  const organization = organizationStore.organizations?.find(
    (org) => org.id === (id ? parseInt(id, 10) : undefined)
  );
  if (!organization) {
    return <ProgressSpinner />;
  }
  return (
    <div className={styles.ViewOrganizations}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {organization?.name}
      </h3>
      <div className={styles.Heading}>
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
      {/* <MetricsOrganization /> */}
      <ViewStatsLayout
        LeftSideComponent={<LeftSideComponent organization={organization} />}
        RightSideComponent={<RightSideComponent />}
      />
    </div>
  );
});

export default ViewOrganization;
