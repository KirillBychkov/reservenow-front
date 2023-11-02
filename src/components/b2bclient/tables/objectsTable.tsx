import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { observer } from 'mobx-react-lite';
import { IObjects } from '@/models/response/GetObjectsResponse';
import objectsStore from '@/store/ObjectsStore';
import { IObject } from '@/models/IObject';

type Props = {
  objects: IObjects[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  first: number;
};

const ObjectsTable: React.FC<Props> = ({ objects, onPageChange, first }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedObject, setSelectedObject] = useState<IObject | null>(null);
  const filters = objectsStore.getFilters;

  const handleViewObject = (object: IObject) => {
    setSelectedObject(object);
    navigate(`object/${object.id}`);
  };

  return (
    <div>
      <DataTable
        className='customObjectTable'
        removableSort
        value={objects}
        selectionMode='single'
        selection={selectedObject}
        onSelectionChange={(e) => {
          handleViewObject(e.value as IObject);
        }}
        footer={
          <Paginator
            template={{
              layout:
                'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            }}
            currentPageReportTemplate={`${t(
              'states.showed'
            )} {first} - {last} ${t('states.of')} {totalRecords}`}
            style={{ justifyContent: 'flex-end' }}
            first={first}
            rows={objectsStore.filters.limit}
            totalRecords={filters.total}
            onPageChange={onPageChange}
          />
        }
      >
        <Column field='id' header={t('objects.id')} />
        <Column field='name' header={t('objects.name')} />
        <Column field='type' header={t('objects.sportType')} sortable />
        <Column field='created_at' header={t('dates.date')} sortable />

        <Column
          header={t('actions.action')}
          body={(rowData: IObject) => (
            <Button
              style={{ maxHeight: '1.5rem' }}
              label={t('actions.open')}
              size='small'
              rounded
              severity='secondary'
              onClick={() => handleViewObject(rowData)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default observer(ObjectsTable);
