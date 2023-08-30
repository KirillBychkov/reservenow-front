import React from 'react';
import styles from './user.module.scss';
import { Notifications } from '@blueprintjs/icons';
import UserProfile from './userProfile/userProfile';

const User: React.FC = () => {
  return (
    <div className={styles.card}>
      <Notifications color='#7961DB' style={{ padding: '0 10px' }} />
      <UserProfile />
    </div>
  );
};

export default User;
