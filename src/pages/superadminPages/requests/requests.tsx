import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './requests.module.scss';
import Searchbar from '@/components/searchbar/searchbar';
import SupportRecordsTable from '@/components/tables/supportRecordsTable';
import { ISupport } from '@/models/ISupport';
import { ProgressSpinner } from 'primereact/progressspinner';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/SupportRecordsStore';

const Requests: React.FC = observer(() => {
  const { t } = useTranslation();

  const [supportRecords, setSupportRecords] = useState<ISupport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSupportRecords = async () => {
      try {
        const data = await supportRecordsStore.getSupportRecords();
        setSupportRecords(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getSupportRecords();
  }, []);

  return (
    <div className={styles.requests}>
      <h3 className='heading heading-3'>{t('requests.requests')}</h3>
      <div className={styles.controls}>
        <Searchbar />
      </div>
      {isLoading ? (
        <ProgressSpinner />
      ) : supportRecords.length ? (
        <SupportRecordsTable supportRecords={supportRecords} />
      ) : (
        <div className={styles.content}>
          <p>{t('requests.null')}</p>
        </div>
      )}
    </div>
  );
});

export default Requests;
