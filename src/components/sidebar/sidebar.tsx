import React from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton/menuButton';
import useRoleBasedMenu from '@/hooks/useRoleBasedMenu';
import { observer } from 'mobx-react-lite';
import Flex from '../UI/layout/flex';
import { Help } from '@blueprintjs/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { FaqBanner } from '../UI/faqBanner/faqBanner';
import authStore from '@/store/authStore';
import { UserRole } from '@/types/enums/user';

const Sidebar: React.FC = () => {
  const menu = useRoleBasedMenu();
  const userRole = authStore.getUserRole;
  const isSidebarShrinking = useMediaQuery('(max-width: 1200px)');
  const isUserFull = userRole === UserRole.UserFull;

  return (
    <Flex
      className={styles.sidebar}
      options={{ direction: 'column', justify: 'space-between' }}
    >
      <div>
        <div className={styles.separator}></div>
        <div className={styles['sidebar__menu']}>
          {menu &&
            menu.map((item) => (
              <MenuButton key={item.page} page={item.page} icon={item.icon}>
                {item.text}
              </MenuButton>
            ))}
        </div>
      </div>

      {isUserFull &&
        (isSidebarShrinking ? (
          <Link to='/faq' className={styles.faqMini}>
            <Help size={22} color='#fff' className={styles.icon} />
          </Link>
        ) : (
          <FaqBanner />
        ))}
    </Flex>
  );
};

export default observer(Sidebar);
