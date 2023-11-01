import { IOrganization } from '@/models/IOrganization';
import styles from './leftSideComponent.module.scss';
import OrganizationDetailsLeft from './organizationDetailsLeft';
interface LeftSideComponentProps {
  organization: IOrganization;
}

const LeftSideComponent: React.FC<LeftSideComponentProps> = ({
  organization,
}) => {
  return (
    <div className={styles.OrganizationDetails}>
      <div className={styles.OrganizationImageDiv}>
        <img
          className={styles.OrganizationImage}
          src={organization.photo}
          alt={organization.name}
        />
      </div>
      <div className={styles.OrganizationDetailsBottom}>
        <OrganizationDetailsLeft organization={organization} />
      </div>
    </div>
  );
};

export default LeftSideComponent;
