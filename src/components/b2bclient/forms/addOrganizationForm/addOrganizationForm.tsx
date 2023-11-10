import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './addOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputSwitchChangeEvent } from 'primereact/inputswitch';
import {
  generateDropdownOptions,
  getDayKey,
  getUpdatedWorkingHoursForAllDays,
  initializeWorkingHours,
  numDaysInWeek,
} from '@/utils/formHelpers/formHelpers';
import organizationStore from '@/store/OrganizationsStore';
import { MainInfo } from './mainInfo';
import { SecondaryInfo } from './secondaryInfo';
import FormFileUpload from './formFileUpload';
import { WorkingHours } from './workingHours';

export interface IAddOrganizationInfo {
  name: string;
  description: string;
  phone: string;
  address: string;
  workingHours: {
    monday_start_hours: number;
    monday_end_hours: number;
    tuesday_start_hours: number;
    tuesday_end_hours: number;
    wednesday_start_hours: number;
    wednesday_end_hours: number;
    thursday_start_hours: number;
    thursday_end_hours: number;
    friday_start_hours: number;
    friday_end_hours: number;
    saturday_start_hours: number;
    saturday_end_hours: number;
    sunday_start_hours: number;
    sunday_end_hours: number;
  };
}

interface Props {}
const initialWorkingHours = initializeWorkingHours(numDaysInWeek);

const AddOrganizationForm: React.FC<Props> = () => {
  const { t } = useTranslation();

  const [allHoursEnabled, setAllHoursEnabled] = useState<boolean>(false);

  const [workingHours, setWorkingHours] = useState(initialWorkingHours);

  const dropdownOptions = generateDropdownOptions();

  const handleClearForm = () => {
    formik.resetForm();
    setWorkingHours(initialWorkingHours);
    setAllHoursEnabled(false);
  };
  const handleAllHoursChange = (e: InputSwitchChangeEvent) => {
    const updatedWorkingHours = workingHours.map((day) => ({
      ...day,
      enabled: !!e.value,
      dropdown1Value: e.value ? 0 : day.dropdown1Value,
      dropdown2Value: e.value ? 23 : day.dropdown2Value,
    }));

    const updatedFormValues = {
      ...formik.values,
      workingHours: {
        ...formik.values.workingHours,
        ...getUpdatedWorkingHoursForAllDays(e.value!, workingHours),
      },
    };

    setAllHoursEnabled(!!e.value);
    setWorkingHours(updatedWorkingHours);
    formik.setValues(updatedFormValues);
  };

  const handleDaySwitchChange = (e: InputSwitchChangeEvent, index: number) => {
    console.log('e', e);

    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours[index] = {
      ...updatedWorkingHours[index],
      enabled: !!e.value,
    };
    setWorkingHours(updatedWorkingHours);
  };

  const handleDropdown1Change = (
    e: { value: number | null },
    index: number
  ) => {
    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours[index].dropdown1Value = e.value !== null ? e.value : 0;

    const updatedFormValues = {
      ...formik.values,
      workingHours: {
        ...formik.values.workingHours,
        [getDayKey(index, 'start')]: e.value !== null ? e.value : 0,
      },
    };

    formik.setValues(updatedFormValues);
  };

  const handleDropdown2Change = (
    e: { value: number | null },
    index: number
  ) => {
    const updatedWorkingHours = [...workingHours];
    updatedWorkingHours[index].dropdown2Value = e.value !== null ? e.value : 0;

    const updatedFormValues = {
      ...formik.values,
      workingHours: {
        ...formik.values.workingHours,
        [getDayKey(index, 'end')]: e.value !== null ? e.value : 0,
      },
    };

    formik.setValues(updatedFormValues);
  };

  const validationSchema = Yup.object({});

  const formData: IAddOrganizationInfo = {
    name: '',
    description: '',
    phone: '',
    address: '',
    workingHours: {
      monday_start_hours: 0,
      monday_end_hours: 0,
      tuesday_start_hours: 0,
      tuesday_end_hours: 0,
      wednesday_start_hours: 0,
      wednesday_end_hours: 0,
      thursday_start_hours: 0,
      thursday_end_hours: 0,
      friday_start_hours: 0,
      friday_end_hours: 0,
      saturday_start_hours: 0,
      saturday_end_hours: 0,
      sunday_start_hours: 0,
      sunday_end_hours: 0,
    },
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);

      const { workingHours, ...otherValues } = values;

      const formattedValues = {
        ...otherValues,
        ...workingHours,
      };
      console.log('formattedValues', formattedValues);

      await organizationStore.addOrganization(formattedValues);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.Form}>
        <MainInfo formik={formik} />
        <SecondaryInfo formik={formik} />
        {/* FileUpload */}
        <div className={styles['Form-UploadFile']}>
          <FormFileUpload />
        </div>
        <WorkingHours
          workingHours={workingHours}
          handleAllHoursChange={handleAllHoursChange}
          handleDaySwitchChange={handleDaySwitchChange}
          handleDropdown1Change={handleDropdown1Change}
          handleDropdown2Change={handleDropdown2Change}
          allHoursEnabled={allHoursEnabled}
          dropdownOptions={dropdownOptions}
        />

        {/* Buttons */}
        <div className={styles.Controls}>
          <Button
            severity='danger'
            fill
            className={styles.Button}
            onClick={handleClearForm}
          >
            {t('actions.cancel')}
          </Button>
          <Button type='submit' fill className={styles.Button}>
            {t('organizations.add')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddOrganizationForm;
