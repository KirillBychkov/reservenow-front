import React, { useEffect } from 'react';
import styles from './organizations.module.scss';
import { Plus } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import organizationStore from '@/store/OrganizationsStore';
import OrganizationList from '@/components/b2bclient/organizations/organizationList';

const Organizations: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoading = organizationStore.isLoading;

  useEffect(() => {
    organizationStore.getOrganizations();
  }, []);

  const organizations = organizationStore.organizations;

  return (
    <div className={styles.Organizations}>
      <div className={styles['Organizations-Heading']}>
        <h3 className='heading heading-3'>
          {t('organizations.organizations')}
        </h3>
        <div className={styles['Heading-Button']}>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('organizations.add')}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ProgressSpinner />
        </div>
      ) : organizations && organizations.length ? (
        <div className={styles['Organizations-Content']}>
          <OrganizationList />
        </div>
      ) : (
        <div className={styles['Organizations-Content_null']}>
          <h2 className='heading heading-2 heading-primary'>
            {t('organizations.null')}
          </h2>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('organizations.add')}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Organizations;
