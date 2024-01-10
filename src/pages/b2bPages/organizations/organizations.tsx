import React, { useContext } from 'react';
import styles from './organizations.module.scss';
import { Plus } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import organizationStore from '@/store/organizationsStore';
import useFetch from '@/hooks/useFetch';
import { Organization } from '@/models/Organization';
import ToastContext from '@/context/toast';
import OrganizationCard from '@/components/UI/cards/organizationCard';

const Organizations: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);

  const { data: organizations, isLoading } = useFetch<Organization[]>(
    organizationStore.getOrganizations,
    [],
    { onError: showError },
  );

  const organizationList = organizations?.map((org: Organization) => (
    <OrganizationCard organization={org} key={org.id} />
  ));

  return (
    <div className={styles.Organizations}>
      <div className={styles.Heading}>
        <h3 className='heading heading-3'>
          {t('organizations.organizations')}
        </h3>
        <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
          {t('organizations.add')}
        </Button>
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
      ) : organizations?.length ? (
        <div className={styles.OrganizationsContent}>{organizationList}</div>
      ) : (
        <div className={styles.OrganizationsContentNull}>
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
