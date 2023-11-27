import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './organizationCard.module.scss';
import Button from '@/components/UI/buttons/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Organization } from '@/models/Organization';
import Logo from '@/assets/footballField.png';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = observer(
  ({ organization }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { name, description, photo } = organization;
    return (
      <div className={styles.OrganizationCard}>
        <div className={styles.CardBox}>
          <img
            src={photo ? photo : Logo}
            alt='Organization'
            className={styles.CardImage}
          />
          <div className={styles.CardInfoBox}>
            <h2 className={styles.CardTitle}>{name}</h2>
            <div className={styles.CardDescription}>
              <p>{description}</p>
            </div>
            <Button
              type='button'
              outlined={true}
              onClick={() => navigate(`/organizations/${organization.id}`)}
            >
              {t('actions.open')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default OrganizationCard;
