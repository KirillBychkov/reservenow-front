import React from 'react';
import { observer } from 'mobx-react-lite';
import organizationStore from '@/store/OrganizationsStore';
import OrganizationCard from './organizationCard';
import { IOrganization } from '@/models/response/OrganizationsResponse';
import styles from './OrganizationList.module.scss';

const OrganizationList: React.FC = observer(() => {
  const organizations = organizationStore.organizations?.values() || [];

  return (
    <div className={styles['Organization-List']}>
      {Array.from(organizations).map((org: IOrganization) => (
        <OrganizationCard organization={org} key={org.id} />
      ))}
    </div>
  );
});

export default OrganizationList;
