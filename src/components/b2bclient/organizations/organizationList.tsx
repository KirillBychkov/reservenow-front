import React from 'react';
import { observer } from 'mobx-react-lite';
import organizationStore from '@/store/OrganizationsStore';
import OrganizationCard from './organizationCard';
import styles from './OrganizationList.module.scss';
import { IOrganization } from '@/models/IOrganization';

const OrganizationList: React.FC = observer(() => {
  const organizations = organizationStore.organizations?.values() || [];

  return (
    <div className={styles.OrganizationList}>
      {Array.from(organizations).map((org: IOrganization) => (
        <OrganizationCard organization={org} key={org.id} />
      ))}
    </div>
  );
});

export default OrganizationList;
