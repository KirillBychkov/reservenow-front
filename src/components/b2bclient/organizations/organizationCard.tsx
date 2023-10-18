import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './OrganizationCard.module.scss';
import Button from '@/components/UI/buttons/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IOrganization } from '@/models/IOrganization';

interface OrganizationCardProps {
  organization: IOrganization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = observer(
  ({ organization }) => {
    const { t } = useTranslation();
    const { name, description } = organization;

    return (
      <div className={styles.OrganizationCard}>
        <div className={styles.CardBox}>
          <img src='src' alt='Organization' className={styles.CardImage} />
          <div className={styles.CardInfoBox}>
            <h2 className={styles.CardTitle}>{name}</h2>
            <div className={styles.CardDescription}>
              <p>{description}</p>
            </div>
            <Link to={`/organizations/${organization.id}`}>
              <Button
                className={styles.CardButton}
                type='button'
                outlined={true}
              >
                {t('actions.open')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default OrganizationCard;
