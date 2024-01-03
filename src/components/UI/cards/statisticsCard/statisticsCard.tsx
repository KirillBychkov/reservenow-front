import classNames from 'classnames';
import React from 'react';
import styles from './statisticsCard.module.scss';

interface Props {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
}

const StatisticsCard: React.FC<Props> = ({ icon, heading, subheading }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <p
          className={classNames(
            'heading-5 heading-muted heading',
            styles.subheading,
          )}
        >
          {subheading}
        </p>
        <h4 className='heading-3'>{heading}</h4>
      </div>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default StatisticsCard;
