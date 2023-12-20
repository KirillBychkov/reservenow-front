import { EquipmentReservation } from '@/hooks/useEquipmentReservations';
import { Equipment } from '@/models/Equipment';
import Flex from '../UI/layout/flex';
import FormField from '../UI/fields/formField';
import CustomDropdown from '../UI/dropdown/customDropdown';
import { Cross } from '@blueprintjs/icons';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './reservationSections.module.scss';
import { useTranslation } from 'react-i18next';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { ChangeEvent } from 'react';

type Props = {
  equipmentReservation: EquipmentReservation;
  options: { label: string; equipment: Equipment }[];
  onDelete: (id: string) => void;
  onChange: (
    id: string,
    data: { equipment?: Equipment; description?: string },
  ) => void;
  reservationNumber: number;
};

export const EquipmentReservationSection = ({
  equipmentReservation,
  options,
  onChange,
  onDelete,
  reservationNumber,
}: Props) => {
  const { equipment, id } = equipmentReservation;
  const { t } = useTranslation();

  const handleChangeEquipment = (e: DropdownChangeEvent) => {
    onChange(id, { equipment: e.target.value.equipment as Equipment });
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(id, { description: e.target.value });
  };

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.equipmentSection.header', { reservationNumber })}
        </h4>
        <Cross
          className={styles.cross}
          color='#B8B8BA'
          onClick={() => onDelete(id)}
        />
      </Flex>

      <FormField label={t('forms.equipmentName')}>
        <CustomDropdown
          placeholder={
            equipment?.name ||
            t('schedule.form.equipmentSection.chooseEquipment')
          }
          options={options}
          onChange={handleChangeEquipment}
        />
      </FormField>

      <FormField label={t('forms.equipmentPrice')}>
        <InputNumber
          placeholder='0.00₴'
          value={equipment?.price_per_hour}
          size={100}
          type='text'
          mode='currency'
          currency='UAH'
          locale='uk-UA'
          disabled
        />
      </FormField>

      <FormField label={t('forms.description')}>
        <InputTextarea
          placeholder={t('forms.enterDescription')}
          autoResize
          onChange={handleChangeDescription}
          rows={4}
        />
      </FormField>
    </div>
  );
};
