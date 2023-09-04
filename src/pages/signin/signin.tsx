import { Heading1, Paragraph } from '@/components/UI/typography/typography';
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
            <Heading1 textColor='primary'>Увійти до ReservNow</Heading1>
            <Paragraph>
              Введіть адресу електронної пошти та пароль для входу!
            </Paragraph>
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
