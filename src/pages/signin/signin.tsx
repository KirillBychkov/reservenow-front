import React from 'react';
import SigninForm from '@/components/forms/signinForm';
import Flex from '@/components/UI/layout/flex';
import styles from './signin.module.scss';
import { ReactComponent as Logo } from '@/assets/logo-white-indigo.svg';

const Signin: React.FC = () => {
  return (
    <Flex options={{ align: 'center' }}>
      <div className={styles.signin}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1 className='heading heading-1 heading-primary'>
              Увійти до ReservNow
            </h1>
            <p className='paragraph'>
              Введіть адресу електронної пошти та пароль для входу!
            </p>
          </div>
          <SigninForm />
        </div>
      </div>
      <div className={styles.image}>
        <Logo></Logo>
      </div>
    </Flex>
  );
};

export default Signin;
