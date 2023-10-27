import Flex from '@/components/UI/layout/flex';
import styles from './activateAccount.module.scss';
import { ReactComponent as Logo } from '@/assets/logo-white-indigo.svg';
import { useTranslation } from 'react-i18next';
import ActivateAccountForm from '@/components/b2bclient/forms/ActivateAccountForm';

const ActivateAccount: React.FC = () => {
  const { t } = useTranslation();

  const resetToken =
    new URLSearchParams(location.search)?.get('reset_token') || '';
  sessionStorage.setItem('reset_token', resetToken);

  return (
    <Flex options={{ align: 'center' }}>
      <div className={styles.signin}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1 className='heading heading-1 heading-primary'>
              {t('b2bsignup.heading')}
            </h1>
            <p className='paragraph'>{t('b2bsignup.subheading')}</p>
          </div>
          <ActivateAccountForm />
        </div>
      </div>
      <div className={styles.image}>
        <Logo></Logo>
      </div>
    </Flex>
  );
};

export default ActivateAccount;
