import React from 'react';
import styles from './homeCard.module.scss';
import { Heading3 } from '../typography/typography';
import { NavLink } from 'react-router-dom';

interface HomeCardProps {
  path: string;
  icon: React.ReactNode;
  heading: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ path, icon, heading }) => {
  return (
    <div className={styles.card}>
      <NavLink to={path}>
        <div className={styles.icon}>{icon}</div>
        <Heading3>{heading}</Heading3>
      </NavLink>
    </div>
  );
};

export default HomeCard;
