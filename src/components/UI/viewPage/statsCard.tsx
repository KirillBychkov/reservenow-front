import React from 'react';
import styles from './statsCard.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface CardProps {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
}

const StatsCard: React.FC<CardProps> = ({ icon, heading, subheading }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.Card}>
      <div className={styles.Icon}>{icon}</div>
      <p
        className={classNames(
          'heading-5 heading-muted heading',
          styles.Subheading,
        )}
      >
        {t(`${subheading}`)}
      </p>
      <h4 className='heading-3'>{heading}</h4>
    </div>
  );
};

export default StatsCard;
