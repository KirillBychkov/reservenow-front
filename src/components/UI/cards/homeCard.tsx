import React from 'react';
import styles from './homeCard.module.scss';
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
        <h3 className='heading heading-3'>{heading}</h3>
      </NavLink>
    </div>
  );
};

export default HomeCard;
