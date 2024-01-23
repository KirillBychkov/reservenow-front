import useFetch from '@/hooks/useFetch';
import { Equipment } from '@/models/Equipment';
import styles from './equipment.module.scss';
import equipmentStore from '@/store/equipmentStore';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import Searchbar from '@/components/searchbar/searchbar';
import { Plus } from '@blueprintjs/icons';
import Button from '@/components/UI/buttons/button';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSort } from '@/hooks/useSort';
import usePaginate from '@/hooks/usePaginate';
import { observer } from 'mobx-react-lite';
import { EquipmentTable } from '@/components/tables/equipmentTable';
import ToastContext from '@/context/toast';
import useSearch from '@/hooks/useSearch';

const Equipment: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useContext(ToastContext);

  const { sort, sortField, sortOrder, handleSort } = useSort();
  const { limit, skip, first, onPageChange } = usePaginate(
    equipmentStore.filters,
  );
  const { search, handleSearch } = useSearch(onPageChange);

  const { data: equipment, isLoading } = useFetch<Equipment[]>(
    () => equipmentStore.getEquipment({ limit, skip, search, sort }),
    [limit, skip, search, sort],
    { onError: showError },
  );
  const isEquipmentEmpty =
    (equipment === null || equipment.length === 0) && !isLoading;

  return (
    <div className={styles.equipment}>
      <h3 className='heading heading-3'>{t('equipment.equipment')}</h3>
      <div className={styles.controls}>
        <Searchbar setSearch={handleSearch} />
        <Button onClick={() => navigate('add')} icon={<Plus color='white' />}>
          {t('actions.addEquipment')}
        </Button>
      </div>
      {isLoading && (
        <div className={styles.content}>
          <ProgressSpinner />
        </div>
      )}

      {equipment?.length && (
        <EquipmentTable
          equipment={equipment}
          onPageChange={onPageChange}
          onSortChange={handleSort}
          first={first}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}

      {isEquipmentEmpty && (
        <div className={styles.content}>
          <h2 className='heading heading-2 heading-primary text-center'>
            {t('equipment.empty')}
          </h2>
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('actions.addEquipment')}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Equipment;
