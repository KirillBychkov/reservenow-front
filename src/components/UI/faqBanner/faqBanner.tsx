import { Help } from '@blueprintjs/icons';
import Flex from '../layout/flex';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './faqBanner.module.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FaqBanner = () => {
  const [isFaqButtonHovered, setIsFaqButtonHovered] = useState(false);
  const { t } = useTranslation();

  const handleFaqButtonHover = () => {
    setIsFaqButtonHovered(true);
  };

  const handleFaqButtonHoverRemove = () => {
    setIsFaqButtonHovered(false);
  };

  return (
    <div className={styles.banner}>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <Link
          to='/faq'
          onMouseEnter={handleFaqButtonHover}
          onMouseLeave={handleFaqButtonHoverRemove}
          className={styles.faqButton}
        >
          <Help size={20} color={isFaqButtonHovered ? '#7961DB' : '#fff'} />
          <p className={classNames('heading heading-6', styles.faqText)}>
            {t('faqBanner.faq')}
          </p>
        </Link>

        <div>
          <p className='heading heading-6 heading-white'>
            {t('faqBanner.needHelp')}
          </p>
          <p className='paragraph paragraph--small paragraph-white'>
            {t('faqBanner.pleaseContactUs')}
          </p>

          <Link to='/contact-us' className={styles.contactButton}>
            <p className={classNames('heading heading-6', styles.buttonText)}>
              {t('faqBanner.contactUs')}
            </p>
          </Link>
        </div>
      </Flex>
    </div>
  );
};
