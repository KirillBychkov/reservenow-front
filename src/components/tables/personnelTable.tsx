import { Manager } from '@/models/Manager';
import { Trainer } from '@/models/Trainer';
import { Personnel } from '@/store/personnelStore';
import { observer } from 'mobx-react-lite';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import Button from '@/components/UI/buttons/button';

type Props = {
  personnel: Personnel;
};

type PersonnelTableData = Manager[] | Trainer[];

interface ManagerWithTypeName extends Manager {
  type: 'manager';
}

interface TrainerWithTypeName extends Trainer {
  type: 'trainer';
}

const getPersonnelTableData = (
  personnel: Personnel,
  language: string,
): PersonnelTableData => {
  const { managers, trainers } = personnel;
  const res = [];
  const formattedManagers = managers.map((manager) => ({
    ...formatObjectIn(manager, language),
    type: 'manager',
  }));
  const formattedTrainers = trainers.map((trainer) => ({
    ...formatObjectIn(trainer, language),
    type: 'trainer',
  }));
  res.push(...formattedManagers, ...formattedTrainers);
  return res;
};

const PersonnelTable: React.FC<Props> = observer(({ personnel }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const formattedPersonnel = getPersonnelTableData(personnel, i18n.language);

  const handleOpenPersonnel = (
    rowData: ManagerWithTypeName | TrainerWithTypeName,
  ) => {
    const { id, type } = rowData;

    navigate(`/personnel/${type}/${id}`);
  };

  return (
    <DataTable
      removableSort
      value={formattedPersonnel}
      className='tableWithoutFooter'
      emptyMessage={t('invalid.search')}
    >
      <Column field='id' header={t('objects.id')} />
      <Column
        header={t('forms.firstName')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${rowData.first_name} ${rowData.last_name}`}</>
        )}
      />
      <Column field='phone' header={t('forms.phone')} />
      <Column
        header={t('forms.email')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${rowData.account?.email || ''}`}</>
        )}
      />
      <Column
        header={t('personnel.role')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${t(`personnel.${rowData.type}`)}`}</>
        )}
        sortable
        sortField='type'
      />
      <Column field='created_at' header={t('dates.date')} sortable />
      <Column
        header={t('actions.open')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <Button
            style={{ maxHeight: '1.5rem' }}
            label={t('actions.open')}
            size='small'
            rounded
            severity='secondary'
            onClick={() => handleOpenPersonnel(rowData)}
          />
        )}
      />
    </DataTable>
  );
});

export default PersonnelTable;
