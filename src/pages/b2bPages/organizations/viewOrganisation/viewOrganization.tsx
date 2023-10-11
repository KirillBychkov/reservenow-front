import React, { useEffect, useMemo } from 'react';
import styles from './viewOrganization.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home, People } from '@blueprintjs/icons';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import organisationStore from '@/store/OrganizationsStore';
import organizationStore from '@/store/OrganizationsStore';
import Button from '@/components/UI/buttons/button';
import OrganizationCard from '@/components/UI/cards/organizationStatsCard';

const ViewOrganisation: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    organisationStore.getOrganizations();
  }, []);

  const organization = organizationStore.organizations?.find(
    (org) => org.id === (id ? parseInt(id, 10) : undefined)
  );

  // Test mock
  const cardData = [
    {
      icon: <Home />,
      heading: 'sidebar.home',
      subheading: 'Всього продажiв',
    },
    {
      icon: <People />,
      heading: 'sidebar.home',
      subheading: 'Всього бронювань',
    },
    {
      icon: <People />,
      heading: 'sidebar.home',
      subheading: 'Всього клієнтів',
    },
  ];

  return (
    <div className={styles['Vieworganizations']}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {organization?.name}
      </h3>
      <div className={styles['Vieworganizations-Heading']}>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('organizations.organizations'), url: '/organizations' },
            {
              label: `${organization?.name}`,
              url: `/organizations/${organization?.id}`,
            },
          ]}
        />
        <Button onClick={() => navigate('edit')}>{t('actions.edit')}</Button>
      </div>
      {/* <MetricsOrganization /> */}
      <div className={styles.FlexContainer}>
        <div className={styles.LeftSide}>
          <div className={styles.OrgDetails}>
            {/* Image */}
            <div className={styles.OrgImageDiv}>
              <img
                className={styles.OrgImage}
                src='https://images.pexels.com/photos/17307123/pexels-photo-17307123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt={organization?.name}
              />
            </div>
            {/* DetailsBottom */}
            <div className={styles.OrgDetailsBottom}>
              <h5>DetailsBottom</h5>
            </div>
          </div>
        </div>
        <div className={styles.RightSide}>
          <div className={styles.TopCards}>
            {cardData.map((card, index) => (
              <OrganizationCard
                key={index}
                icon={card.icon}
                heading={card.heading}
                subheading={card.subheading}
              />
            ))}
          </div>
          <div className={styles.BottomTable}>Table</div>
        </div>
      </div>
    </div>
  );
});

export default ViewOrganisation;
