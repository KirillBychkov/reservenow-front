import React from 'react';
import styles from './personnel.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/buttons/button';
import { Plus } from '@blueprintjs/icons';
import { useNavigate } from 'react-router-dom';
import personnelStore from '@/store/personnelStore';
import useFetch from '@/hooks/useFetch';
import { observer } from 'mobx-react-lite';
import { Trainer } from '@/models/Trainer';

const Personnel: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: personnel,
    isLoading,
    errorMsg,
  } = useFetch<Trainer[]>(personnelStore.getTrainers, []);

  console.log(personnel);

  return (
    <div className={styles.personnel}>
      <div className={styles.controls}>
        <h3 className='heading heading-3'>{t('personnel.personnel')}</h3>
        <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
          {t('personnel.add')}
        </Button>
      </div>

      <div className={styles.content}>
        <h2 className='heading heading-2 heading-primary text-center'>
          {t('personnel.null')}
        </h2>
        <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
          {t('personnel.add')}
        </Button>
      </div>
    </div>
  );
});

export default Personnel;
