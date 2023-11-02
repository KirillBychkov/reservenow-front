import { IOrganization } from '@/models/IOrganization';
import classNames from 'classnames';
import styles from './organizationDetailsLeft.module.scss';
import { daysOfWeek } from '@/utils/organizationHelpers';
import { renderWorkingHours } from './renderWorkingHours';
import { useTranslation } from 'react-i18next';

type Props = {
  organization: IOrganization;
};

const OrganizationDetailsLeft = ({ organization }: Props) => {
  const { name, id, address } = organization;
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.OrganizationId}>
        <p className={classNames('heading-muted heading-6')}>
          {t('organizations.organizationId')}
        </p>
        <h6 className={classNames('heading heading-6')}>{id}</h6>
      </div>
      <div className={styles.OrganizationName}>
        <h6 className={classNames('heading-muted heading-6')}>
          {t('organizations.name')}
        </h6>
        <h6 className={classNames('heading heading-6')}>{name}</h6>
      </div>
      <div className={styles.OrganizationAddress}>
        <h6 className={classNames('heading-muted heading-6')}>
          {t('organizations.location')}
        </h6>
        <h6 className={classNames('heading heading-6')}>{address}</h6>
      </div>
      <div className={styles.OrganizationWorkingHours}>
        <h6 className={classNames('heading heading-6')}>
          {t('organizations.workHours')}
        </h6>
        {daysOfWeek.map((day) => renderWorkingHours(organization, day))}
      </div>
    </>
  );
};

export default OrganizationDetailsLeft;
