import React from 'react';
import styles from './organizationStatsCard.module.scss';

interface CardProps {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
}

const OrganizationCard: React.FC<CardProps> = ({
  icon,
  heading,
  subheading,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <p className={styles.subheading}>{subheading}</p>
        <h4 className={styles.heading}>{heading}</h4>
      </div>
    </div>
  );
};

export default OrganizationCard;
