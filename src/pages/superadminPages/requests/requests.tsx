import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './requests.module.scss';
import Searchbar from '@/components/searchbar/searchbar';
import SupportRecordsTable from '@/components/tables/supportRecordsTable';
import { ISupport } from '@/models/ISupport';
import { ProgressSpinner } from 'primereact/progressspinner';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/SupportRecordsStore';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import usePaginate from '@/hooks/usePaginate';

const Requests: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = React.useState('');

  const { limit, skip, first, onPageChange } = usePaginate(
    supportRecordsStore.pagination
  );

  const {
    data: supportRecords,
    isLoading,
    errorMsg,
  } = useFetch<ISupport[]>(
    () => supportRecordsStore.getSupportRecords({ limit, skip, search }),
    [limit, skip, search]
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.requests}>
      <h3 className='heading heading-3'>{t('requests.requests')}</h3>
      <div className={styles.controls}>
        <Searchbar setSearch={setSearch} />
      </div>
      {isLoading ? (
        <ProgressSpinner />
      ) : supportRecords?.length ? (
        <SupportRecordsTable
          supportRecords={supportRecords}
          first={first}
          onPageChange={onPageChange}
        />
      ) : (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary text-center'>
            {t('requests.null')}
          </h2>
        </div>
      )}
    </div>
  );
});

export default Requests;
