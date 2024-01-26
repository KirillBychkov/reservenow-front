import Flex from '@/components/UI/layout/flex';
import styles from './manageEquipment.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useParams } from 'react-router-dom';
import { Home } from '@blueprintjs/icons';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ManageEquipmentForm } from '@/components/forms/manageEquipmentForm/manageEquipmentForm';
import useFetch from '@/hooks/useFetch';
import { observer } from 'mobx-react-lite';
import { Equipment } from '@/models/Equipment';
import equipmentStore from '@/store/equipmentStore';
import { useContext } from 'react';
import ToastContext from '@/context/toast';
import { useTranslation } from 'react-i18next';

const ManageEquipment = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { showError } = useContext(ToastContext);
  const { data: initialValues, isLoading } = useFetch<Equipment>(
    () =>
      id
        ? equipmentStore.getEquipmentById(parseInt(id))
        : Promise.resolve({ data: {} as Equipment, error: '' }),
    [id],
    { onError: showError },
  );
  const isEditingMode = id && initialValues;

  return (
    <Flex
      options={{ direction: 'column', gap: 2 }}
      className={styles.manageEquipment}
    >
      <Flex options={{ direction: 'column', gap: 0.625 }}>
        <h3 className='heading heading-3'>
          {isEditingMode
            ? t('actions.editEquipment')
            : t('actions.addEquipment')}
        </h3>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: t('equipment.equipment'), url: '/equipment' },
            {
              label: isEditingMode
                ? `${initialValues.id}`
                : t('actions.addEquipment'),
              url: '/equipment/add',
            },
          ]}
        />
      </Flex>
      <div className={styles.form}>
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <ManageEquipmentForm initialValues={initialValues || undefined} />
        )}
      </div>
    </Flex>
  );
});

export default ManageEquipment;
