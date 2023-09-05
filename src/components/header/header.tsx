import React from 'react';
import { ReactComponent as Logo } from '@/assets/logo-black-indigo.svg';
import styles from './header.module.scss';
import User from './user/user';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header__logo']}>
        <Logo />
      </div>

      <User />
    </div>
  );
};

export default Header;
