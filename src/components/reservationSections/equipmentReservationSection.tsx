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
import { ChangeEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';

type Props = {
  equipmentReservation: EquipmentReservation;
  options: { label: string; equipment: Equipment }[];
  onDelete: (id: string) => void;
  onChange: (
    id: string,
    data: { equipment?: Equipment; description?: string },
  ) => void;
  reservationNumber: number;
  isEditingMode: boolean;
  isSubmitting: boolean;
};

export const EquipmentReservationSection = ({
  equipmentReservation,
  options,
  onChange,
  onDelete,
  reservationNumber,
  isEditingMode,
  isSubmitting,
}: Props) => {
  const { equipment, id } = equipmentReservation;
  const { t } = useTranslation();
  const validationSchema = yup.object({
    equipmentName: yup.string().required(t('invalid.required')),
  });

  const initialValues = {
    equipmentName: equipment?.name || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit() {},
  });

  const handleChangeEquipment = (e: DropdownChangeEvent) => {
    onChange(id, { equipment: e.target.value.equipment as Equipment });
    formik.setFieldValue('equipmentName', e.target.value.equipment.name);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(id, { description: e.target.value });
  };

  useEffect(() => {
    if (isSubmitting) {
      formik.submitForm();
    }
  }, [isSubmitting]);

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.equipmentSection.header', { reservationNumber })}
        </h4>

        {!isEditingMode && (
          <Cross
            className={styles.cross}
            color='#B8B8BA'
            onClick={() => onDelete(id)}
          />
        )}
      </Flex>

      <FormField
        label={t('forms.equipmentName')}
        isValid={!(formik.touched.equipmentName && formik.errors.equipmentName)}
        invalidMessage={formik.errors.equipmentName}
      >
        <CustomDropdown
          name='equipmentName'
          disabled={isEditingMode}
          value={{
            label: formik.values.equipmentName,
            equipment,
          }}
          placeholder={t('schedule.form.equipmentSection.chooseEquipment')}
          options={options}
          onChange={handleChangeEquipment}
          onBlur={formik.handleBlur}
          className={classNames(isValidClassname(formik, 'equipmentName'))}
        />
      </FormField>

      <FormField label={t('forms.equipmentPrice')}>
        <InputNumber
          placeholder='0.00₴'
          value={equipment?.price}
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
          disabled={isEditingMode}
          onChange={handleChangeDescription}
          rows={4}
        />
      </FormField>
    </div>
  );
};
