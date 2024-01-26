import React, { useContext, useState } from 'react';
import styles from './personnel.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/buttons/button';
import { Plus } from '@blueprintjs/icons';
import personnelStore, { Personnel } from '@/store/personnelStore';
import useFetch from '@/hooks/useFetch';
import { observer } from 'mobx-react-lite';
import { ProgressSpinner } from 'primereact/progressspinner';
import PersonnelTable from '@/components/tables/personnelTable';
import ToastContext from '@/context/toast';
import SelectPersonnelModal from '@/components/selectPersonnelModal/selectPersonnelModal';

const Personnel: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const [isSelectPersonnelModalOpen, setIsSelectPersonnelModalOpen] =
    useState<boolean>(false);

  const { data: personnel, isLoading } = useFetch<Personnel>(
    personnelStore.getPersonnel,
    [],
    { onError: showError },
  );

  return (
    <div className={styles.personnel}>
      <div className={styles.controls}>
        <h3 className='heading heading-3'>{t('personnel.personnel')}</h3>
        <Button
          icon={<Plus color='white' />}
          onClick={() => setIsSelectPersonnelModalOpen(true)}
        >
          {t('personnel.add')}
        </Button>
        <SelectPersonnelModal
          visible={isSelectPersonnelModalOpen}
          setIsVisible={setIsSelectPersonnelModalOpen}
        />
      </div>

      {isLoading ? (
        <ProgressSpinner />
      ) : personnel ? (
        <PersonnelTable personnel={personnel} />
      ) : (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary text-center'>
            {t('personnel.null')}
          </h2>
          <Button
            icon={<Plus color='white' />}
            onClick={() => setIsSelectPersonnelModalOpen(true)}
          >
            {t('personnel.add')}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Personnel;
