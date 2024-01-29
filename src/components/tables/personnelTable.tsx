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
import dayjs from 'dayjs';
import { formatCreatedAtTable } from '@/utils/formatters/formatDate';

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

  const formattedManagers = managers.map((manager) => ({
    ...formatObjectIn(manager, language),
    type: 'manager',
    created_at: formatCreatedAtTable(manager, language)
  }));
  const formattedTrainers = trainers.map((trainer) => ({
    ...formatObjectIn(trainer, language),
    type: 'trainer',
    created_at: formatCreatedAtTable(trainer, language),
  }));

  return [...formattedManagers, ...formattedTrainers];
};

const PersonnelTable: React.FC<Props> = observer(({ personnel }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);

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
    >
      <Column
        field='id'
        header={t('objects.id')}
        style={{ minWidth: '80px' }}
      />
      <Column
        style={{ minWidth: '200px' }}
        header={t('forms.firstName')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${rowData.first_name} ${rowData.last_name}`}</>
        )}
      />
      <Column
        style={{ minWidth: '177px' }}
        field='phone'
        header={t('forms.phone')}
      />
      <Column
        style={{ minWidth: '200px' }}
        header={t('forms.email')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${rowData.account?.email || ''}`}</>
        )}
      />
      <Column
        style={{ minWidth: '170px' }}
        header={t('personnel.role')}
        body={(rowData: ManagerWithTypeName | TrainerWithTypeName) => (
          <>{`${t(`personnel.${rowData.type}`)}`}</>
        )}
        sortable
        sortField='type'
      />
      <Column
        style={{ minWidth: '160px' }}
        field='created_at'
        header={t('dates.date')}
        sortable
      />
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
