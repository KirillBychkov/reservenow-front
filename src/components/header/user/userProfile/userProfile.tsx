import Flex from '@/components/UI/layout/flex';
import React from 'react';
import styles from './userProfile.module.scss';
import { Person } from '@blueprintjs/icons';

const UserProfile: React.FC = () => {
  return (
    <Flex options={{ gap: 0.62, align: 'center' }}>
      <div className={styles.username}>Username</div>
      <div className={styles['avatar-placeholder']}>
        <Person color='white' />
      </div>
    </Flex>
  );
};

export default UserProfile;
