import { SortField, SortOrder } from '@/hooks/useSort';
import { Equipment } from '@/models/Equipment';
import equipmentStore from '@/store/equipmentStore';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';
import Flex from '../UI/layout/flex';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import ToastContext from '@/context/toast';
import { formatObjectIn } from '@/utils/formatters/formatObject';

type TableProps = {
  equipment: Equipment[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
};

export const EquipmentTable: React.FC<TableProps> = observer(
  ({ equipment, onPageChange, onSortChange, first, sortField, sortOrder }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { showSuccess, showError } = useContext(ToastContext);
    const filters = equipmentStore.getFilters();

    const handleEditEquipment = (id: number) => {
      navigate(`${id}/edit`);
    };

    const handleDeleteEquipment = async (id: number) => {
      const { successMsg, errorMsg } = await equipmentStore.deleteEquipment(id);

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
    };

    const formattedEquipment = useMemo(
      () => equipment.map((eq) => formatObjectIn(eq, i18n.language)),
      [equipment],
    );

    return (
      <DataTable
        removableSort
        value={formattedEquipment}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSortChange}
        lazy
        footer={
          <Paginator
            template={{
              layout:
                'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            }}
            currentPageReportTemplate={`${t(
              'states.showed',
            )} {first} - {last} ${t('states.of')} {totalRecords}`}
            style={{ justifyContent: 'flex-end' }}
            first={first}
            rows={filters.limit}
            totalRecords={filters.total}
            onPageChange={onPageChange}
          />
        }
      >
        <Column
          style={{ width: '70%' }}
          field='name'
          header={t('equipment.nameColumn')}
          sortable
        />
        <Column
          field='price'
          header={t('equipment.priceColumn')}
          body={(rowData: Equipment) => (
            <p className='text-medium'>UAH {rowData.price}</p>
          )}
          sortable
        />
        <Column
          header={t('actions.actions')}
          body={({ id }: Equipment) => (
            <Flex options={{ gap: 0.5 }}>
              <Button
                label={t('actions.edit')}
                style={{ maxHeight: '1.5rem' }}
                size='small'
                rounded
                severity='secondary'
                onClick={() => handleEditEquipment(id)}
              />

              <Button
                label={t('actions.delete')}
                style={{ maxHeight: '1.5rem' }}
                size='small'
                rounded
                severity='secondary'
                onClick={() => handleDeleteEquipment(id)}
              />
            </Flex>
          )}
        />
      </DataTable>
    );
  },
);
