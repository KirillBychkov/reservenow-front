import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './editOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputSwitchChangeEvent } from 'primereact/inputswitch';
import { MainInfo } from '@/components/b2bclient/forms/addOrganizationForm/MainInfo';
import { SecondaryInfo } from '@/components/b2bclient/forms/addOrganizationForm/SecondaryInfo';
import { WorkingHours } from '@/components/b2bclient/forms/addOrganizationForm/WorkingHours';
import {
  generateDropdownOptions,
  getDayKey,
  getUpdatedWorkingHoursForAllDays,
  initializeWorkingHours,
  numDaysInWeek,
} from '@/utils/formHelpers/formHelpers';
import organizationStore from '@/store/OrganizationsStore';
import { ProgressSpinner } from 'primereact/progressspinner';

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

interface Props {
  initialValues?: IAddOrganizationInfo;
}

const EditOrganizationForm: React.FC<Props> = ({ initialValues }) => {
  const { t } = useTranslation();

  if (!initialValues) return <ProgressSpinner />;
  const initialWorkingHours = initializeWorkingHours(numDaysInWeek);

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
    name: initialValues?.name,
    description: initialValues?.description,
    phone: initialValues?.phone,
    address: initialValues?.address,
    workingHours:
      initialValues?.workingHours || initializeWorkingHours(numDaysInWeek),
    //  || {
    //   monday_start_hours: 0,
    //   monday_end_hours: 0,
    //   tuesday_start_hours: 0,
    //   tuesday_end_hours: 0,
    //   wednesday_start_hours: 0,
    //   wednesday_end_hours: 0,
    //   thursday_start_hours: 0,
    //   thursday_end_hours: 0,
    //   friday_start_hours: 0,
    //   friday_end_hours: 0,
    //   saturday_start_hours: 0,
    //   saturday_end_hours: 0,
    //   sunday_start_hours: 0,
    //   sunday_end_hours: 0,
    // },
  };
  console.log('FORM INITV', formData);
  const formik = useFormik({
    initialValues: formData as IAddOrganizationInfo,
    // : initialValues as IAddOrganizationInfo,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { workingHours, ...otherValues } = values;

      const formattedValues = {
        ...otherValues,
        ...workingHours,
      };
      //   const formattedValues = {
      //     ...otherValues,
      //     workingHours: {
      //         ...workingHours,
      //       },
      //   };

      await organizationStore.addOrganization(formattedValues);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.Form}>
        <MainInfo t={t} formik={formik} />
        <SecondaryInfo t={t} formik={formik} />
        {/* FileUpload */}
        {/* <div className={styles['Form-UploadFile']}>
          <FileUpload />
        </div> */}
        <WorkingHours
          t={t}
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

export default EditOrganizationForm;
