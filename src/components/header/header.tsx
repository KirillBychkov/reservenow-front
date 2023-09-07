import React from 'react';
import { ReactComponent as Logo } from '@/assets/logo-black-indigo.svg';
import styles from './header.module.scss';
import User from './user/user';

const Header: React.FC = () => {
  // TODO: add language switcher and add english translation

  // const {
  //   t,
  //   i18n: { changeLanguage, language },
  // } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState(language);

  // const handleChangeLanguage = () => {
  //   const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';
  //   setCurrentLanguage(newLanguage);
  //   changeLanguage(newLanguage);
  // };

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
