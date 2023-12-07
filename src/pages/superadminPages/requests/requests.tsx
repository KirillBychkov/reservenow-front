import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './requests.module.scss';
import Searchbar from '@/components/searchbar/searchbar';
import SupportRecordsTable from '@/components/tables/supportRecordsTable';
import { Support } from '@/models/Support';
import { ProgressSpinner } from 'primereact/progressspinner';
import { observer } from 'mobx-react-lite';
import supportRecordsStore from '@/store/supportRecordsStore';
import useFetch from '@/hooks/useFetch';
import ToastContext from '@/context/toast';
import usePaginate from '@/hooks/usePaginate';
import { useSort } from '@/hooks/useSort';

const Requests: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const [search, setSearch] = React.useState('');

  const { limit, skip, first, onPageChange } = usePaginate(
    supportRecordsStore.filters,
  );

  const { sortField, sortOrder, handleSort, sort } = useSort();

  const {
    data: supportRecords,
    isLoading,
    errorMsg,
  } = useFetch<Support[]>(
    () => supportRecordsStore.getSupportRecords({ limit, skip, search, sort }),
    [limit, skip, search, sort],
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
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSort}
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
