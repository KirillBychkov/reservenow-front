import React from 'react';
import styles from './organizationStatsCard.module.scss';
import { BankAccount, Endorsed, ShoppingCart } from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';

interface CardProps {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
}
const ICON_PROPS = {
  size: 24,
  color: 'white',
};

// Test mock
// /organization/statistics/id
export const cardData = [
  {
    icon: <BankAccount {...ICON_PROPS} />,
    heading: `UAH 26 124,12`,
    subheading: 'organizations.totalSales',
  },
  {
    icon: <ShoppingCart {...ICON_PROPS} />,
    heading: `135`,
    subheading: 'organizations.totalBookings',
  },
  {
    icon: <Endorsed {...ICON_PROPS} />,
    heading: `235`,
    subheading: 'organizations.totalClients',
  },
];

const OrganizationStatsCard: React.FC<CardProps> = ({
  icon,
  heading,
  subheading,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.Card}>
      <div className={styles.Icon}>{icon}</div>
      <div className={styles.Content}>
        <p className={'heading-5  heading-muted heading' + styles.Subheading}>
          {t(`${subheading}`)}
        </p>
        <h4 className='heading-3'>{heading}</h4>
      </div>
    </div>
  );
};

export default OrganizationStatsCard;
