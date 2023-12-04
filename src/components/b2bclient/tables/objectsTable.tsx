import React from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { observer } from 'mobx-react-lite';
import objectsStore from '@/store/objectsStore';
import { RentalObject } from '@/models/RentalObject';
import { formatDate } from '@/utils/formatters/formatDate';
import { SortField, SortOrder } from '@/hooks/useSort';

type Props = {
  objects: RentalObject[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (e: DataTableStateEvent) => void;
};

const ObjectsTable: React.FC<Props> = observer(
  ({ objects, onPageChange, first, sortField, sortOrder, onSortChange }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [selectedObject, setSelectedObject] = useState<RentalObject | null>(
      null,
    );
    const filters = objectsStore.getFilters;

    const handleViewObject = (object: RentalObject) => {
      setSelectedObject(object);
      navigate(`objects/${object.id}`);
    };

    const handleEditObject = (object: RentalObject) => {
      navigate(`objects/${object.id}/edit`);
    };

    const formattedObjects = objects.map((object) => ({
      ...object,
      created_at: formatDate(object.created_at, i18n.language),
    }));

    return (
      <div>
        <DataTable
          className='customObjectTable'
          removableSort
          value={formattedObjects}
          selectionMode='single'
          selection={selectedObject}
          onSelectionChange={(e) => {
            handleViewObject(e.value as RentalObject);
          }}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSortChange}
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
              rows={objectsStore.filters.limit}
              totalRecords={filters.total}
              onPageChange={onPageChange}
            />
          }
        >
          <Column field='id' header={t('objects.id')} sortable />
          <Column field='name' header={t('objects.name')} sortable />
          <Column field='type' header={t('objects.sportType')} />
          <Column field='created_at' header={t('dates.date')} sortable />

          <Column
            header={t('actions.action')}
            body={(rowData: RentalObject) => (
              <Button
                style={{ maxHeight: '1.5rem' }}
                label={t('actions.edit')}
                size='small'
                rounded
                severity='secondary'
                onClick={() => handleEditObject(rowData)}
              />
            )}
          />
        </DataTable>
      </div>
    );
  },
);

export default ObjectsTable;
