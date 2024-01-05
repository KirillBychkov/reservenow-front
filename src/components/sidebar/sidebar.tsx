import React from 'react';
import styles from './sidebar.module.scss';
import MenuButton from '../UI/buttons/menuButton/menuButton';
import useRoleBasedMenu from '@/hooks/useRoleBasedMenu';
import { observer } from 'mobx-react-lite';
import Flex from '../UI/layout/flex';
import { Help } from '@blueprintjs/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { FaqBanner } from '../UI/faqBanner/faqBanner';

const Sidebar: React.FC = () => {
  // Hook that provides menu items for RBAC
  const menu = useRoleBasedMenu();
  const isSidebarShrinking = useMediaQuery('(max-width: 1200px)');

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

      {isSidebarShrinking ? (
        <Link to='/faq'  className={styles.faqMini}>
          <Help size={22} color='#fff' className={styles.icon}/>
        </Link>
      ) : (
        <FaqBanner />
      )}
    </Flex>
  );
};

export default observer(Sidebar);
