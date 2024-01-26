import React from 'react';
import SigninForm from '@/components/forms/signinForm/signinForm';
import Flex from '@/components/UI/layout/flex';
import styles from './signin.module.scss';
import { ReactComponent as Logo } from '@/assets/logo-white-indigo.svg';
import { useTranslation } from 'react-i18next';

const Signin: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex options={{ align: 'center' }}>
      <div className={styles.signin}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1 className='heading heading-1 heading-primary'>
              {t('signin.heading')}
            </h1>
            <p className='paragraph'>{t('signin.subheading')}</p>
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
