import { BreadCrumb } from 'primereact/breadcrumb';
import styles from './password.module.scss';
import { Home, TickCircle } from '@blueprintjs/icons';
import Flex from '@/components/UI/layout/flex';
import PasswordChangeForm from '@/components/forms/passwordChangeForm';
import { useState } from 'react';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const PasswordPage = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleIsPasswordChange = () => {
    setIsPasswordChanged(true);
  };

  return (
    <Flex
      options={{ direction: 'column', gap: 2 }}
      className={styles.passwordPage}
    >
      <article>
        <h3 className={classNames('heading heading-3', styles.heading)}>{t('profile.heading')}</h3>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('profile.heading'), url: '/profile' },
            {
              label: t('profile.changePassword'),
              url: '/profile/password',
              disabled: true,
            },
          ]}
        />
      </article>

      <article className={styles.section}>
        {isPasswordChanged ? (
          <Flex
            options={{ direction: 'column', gap: 1 }}
            className={styles.success}
          >
            <TickCircle size={80} color='#62D96B' />
            <h1 className='heading heading-1 heading-primary'>
              {t('profile.passwordChanged')}
            </h1>
            <p>{t('profile.passwordChangedMessage')}</p>
            <Button onClick={() => navigate('/')} fill className={styles.btn}>
              {t('profile.goBack')}
            </Button>
          </Flex>
        ) : (
          <PasswordChangeForm onSuccess={handleIsPasswordChange} />
        )}
      </article>
    </Flex>
  );
};

export default PasswordPage;
