import { IOrganization } from '@/models/IOrganization';
import styles from './organizationDetailsLeft.module.scss';
import { daysOfWeek } from '@/utils/formHelpers/formHelpers';
import { RenderWorkingHours } from './renderWorkingHours';
import { useTranslation } from 'react-i18next';

interface Props {
  organization: IOrganization;
}

const OrganizationDetailsLeft: React.FC<Props> = ({ organization }) => {
  const { name, id, address } = organization;
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.OrganizationId}>
        <p className={'heading-muted heading-6'}>
          {t('organizations.organizationId')}
        </p>
        <h6 className={'heading heading-6'}>{id}</h6>
      </div>
      <div className={styles.OrganizationName}>
        <h6 className={'heading-muted heading-6'}>{t('organizations.name')}</h6>
        <h6 className={'heading heading-6'}>{name}</h6>
      </div>
      <div className={styles.OrganizationAddress}>
        <h6 className={'heading-muted heading-6'}>
          {t('organizations.location')}
        </h6>
        <h6 className={'heading heading-6'}>{address}</h6>
      </div>
      <div className={styles.OrganizationWorkingHours}>
        <h6 className={'heading heading-6'}>{t('organizations.workHours')}</h6>
        {daysOfWeek.map((day, i) => (
          <RenderWorkingHours organization={organization} day={day} key={i} />
        ))}
      </div>
    </>
  );
};

export default OrganizationDetailsLeft;
