import { IOrganization } from '@/models/IOrganization';
import classNames from 'classnames';
import styles from './OrganizationDetailsLeft.module.scss';
import { daysOfWeek } from '@/utils/organizationHelpers';
import { renderWorkingHours } from './renderWorkingHours';

type Props = {
  organization: IOrganization;
};

const OrganizationDetailsLeft = ({ organization }: Props) => {
  const { name, id, address } = organization;

  return (
    <>
      <div className={styles.orgId}>
        <p className={classNames('heading heading-6')}>ID організації</p>
        <h6 className={classNames('heading heading-6')}>{id}</h6>
      </div>
      <div className={styles.orgName}>
        <h6 className={classNames('heading heading-6')}>Назва організації</h6>
        <h6 className={classNames('heading heading-6')}>{name}</h6>
      </div>
      <div className={styles.orgAddress}>
        <h6 className={classNames('heading heading-6')}>Місцезнаходження</h6>
        <h6 className={classNames('heading heading-6')}>{address}</h6>
      </div>
      <div className={styles.orgWorkingHours}>
        <h6 className={classNames('heading heading-6')}>Години роботи</h6>
        {daysOfWeek.map((day) => renderWorkingHours(organization, day))}
      </div>
    </>
  );
};

export default OrganizationDetailsLeft;
