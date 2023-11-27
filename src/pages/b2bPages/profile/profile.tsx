import Flex from '@/components/UI/layout/flex';
import styles from './profile.module.scss';
import useFetch from '@/hooks/useFetch';
import authStore from '@/store/AuthStore';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { EditProfileForm } from '@/components/b2bclient/forms/editProfileForm/editProfileForm';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Account } from '@/models/User';

const Profile = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: account, isLoading } = useFetch<Account>(() =>
    authStore.getUser(),
  );

  return (
    <Flex
      options={{ direction: 'column', gap: 2.25 }}
      className={styles.profile}
    >
      <h3 className='heading heading-3'>{t('profile.heading')}</h3>

      <Flex
        options={{ direction: 'column', gap: 1.5 }}
        className={styles.section}
      >
        {account && <EditProfileForm initialValues={account} />}
        {isLoading && <ProgressSpinner />}
        <Flex
          options={{ align: 'center', justify: 'space-between' }}
          className={styles.changePassword}
        >
          <h4 className='heading heading-4'>{t('profile.changePassword')}</h4>
          <Button
            outlined
            fill
            className={styles.btn}
            onClick={() => navigate('password')}
          >
            {t('profile.changePassword')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default Profile;
