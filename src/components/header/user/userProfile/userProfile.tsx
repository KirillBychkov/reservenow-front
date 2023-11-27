import Flex from '@/components/UI/layout/flex';
import React, { useEffect, useRef, useState } from 'react';
import styles from './userProfile.module.scss';
import { LogOut, Person } from '@blueprintjs/icons';
import authStore from '@/store/AuthStore';
import { observer } from 'mobx-react-lite';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserProfile: React.FC = observer(() => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const menuLeft = useRef<Menu>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const items = [
    {
      label: t('profile.heading'),
      command: () => {
        navigate('/profile');
      },
    },
    {
      label: t('contact-us.heading'),
      command: () => {
        navigate('/contact-us');
      },
    },
    {
      template: () => {
        return (
          <div className='p-menuitem-link'>
            <p className='p-menuitem-text'>{t('actions.signout')}</p>
            <LogOut color='#7961DB' />
          </div>
        );
      },
    },
  ];

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
    <div
      className={styles.profile}
      onClick={(event) => menuLeft?.current?.toggle(event)}
    >
      <Flex options={{ gap: 0.62, align: 'center' }}>
        <div className={styles.username}>{userName}</div>
        <div className={styles['avatar-placeholder']}>
          <Person color='white' />
        </div>
        <Menu
          style={{ width: '242px' }}
          className={styles.menu}
          model={items}
          ref={menuLeft}
          popup
        />
      </Flex>
    </div>
  );
});

export default UserProfile;
