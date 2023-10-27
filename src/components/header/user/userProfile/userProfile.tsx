import Flex from '@/components/UI/layout/flex';
import React, { useEffect, useState } from 'react';
import styles from './userProfile.module.scss';
import { Person } from '@blueprintjs/icons';
import authStore from '@/store/AuthStore';
import { observer } from 'mobx-react-lite';

const UserProfile: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        await authStore.getUser();
        setUserName(authStore.getUserName || '');
      } catch (e) {
        setUserName('');
      }
    })();
  }, []);

  return (
    <Flex options={{ gap: 0.62, align: 'center' }}>
      <div className={styles.username}>{userName}</div>
      <div className={styles['avatar-placeholder']}>
        <Person color='white' />
      </div>
    </Flex>
  );
};

export default observer(UserProfile);
