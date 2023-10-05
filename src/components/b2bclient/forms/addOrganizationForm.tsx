import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import Button from '@/components/UI/buttons/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import styles from './addOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
// import { FileUpload } from 'primereact/fileupload';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';

import CustomDropdown from '@/components/UI/Dropdown/CustomDropdown';

export interface addOrganizationInfo {
  name: string;
  description: string;
  phone: string;
}

interface Props {
  initialValues?: addOrganizationInfo;
}

const AddOrganizationForm: React.FC<Props> = ({ initialValues }) => {
  const { t } = useTranslation();

  const [allHoursEnabled, setAllHoursEnabled] = useState<boolean>(false);

  const [workingHours, setWorkingHours] = useState([
    { enabled: false, dropdown1Value: 0, dropdown2Value: 0 },
    // ? 7 rows
  ]);

  const handleAllHoursChange = (e: InputSwitchChangeEvent) => {};

  const dropdownOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const handleSwitchChange = (e: InputSwitchChangeEvent, index: number) => {
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
  ) => {};

  const handleDropdown2Change = (
    e: { value: number | null },
    index: number
  ) => {};

  const validationSchema = Yup.object({
    name: Yup.string().required(t('invalid.required')),
    description: Yup.string().required(t('invalid.required')),
    phone: Yup.string()
      .required(t('invalid.required'))
      .test('phone', t('invalid.phone'), (value) => {
        if (value) {
          return !value.includes('_');
        }
        return false;
      }),
  });

  const formData: addOrganizationInfo = initialValues || {
    name: '',
    description: '',
    phone: '',
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {},
  });

  const handleClearForm = () => formik.resetForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.Form}>
        <div className={styles['Form-MainInfo']}>
          <h4 className='heading heading-4 heading-primary'>
            {t('forms.overallInfo')}
          </h4>
          <FormField
            label={t('addOrganizationForm.name')}
            isValid={!(formik.touched.name && formik.errors.name)}
            invalidMessage={formik.errors.name}
          >
            <InputText
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('addOrganizationForm.enterName')}
              className={classNames(isValidClassname(formik, 'name'))}
            />
          </FormField>

          <FormField label={t('forms.description')}>
            <InputTextarea
              autoResize
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder={t('addOrganizationForm.enterDescription')}
              rows={6}
            />
          </FormField>
        </div>
        <div className={styles['Form-SecondaryInfo']}>
          <FormField
            label={t('forms.phone')}
            isValid={!(formik.touched.phone && formik.errors.phone)}
            invalidMessage={formik.errors.phone}
          >
            <InputMask
              name='phone'
              mask='+38 (999) 999-9999'
              placeholder='+38 (___) ___-____'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'phone'))}
            />
          </FormField>
          <FormField
            label={t('addOrganizationForm.location')}
            isValid={!(formik.touched.name && formik.errors.name)}
            invalidMessage={formik.errors.name}
          >
            <InputText
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('addOrganizationForm.enterLocation')}
              className={classNames(isValidClassname(formik, 'name'))}
            />
          </FormField>
        </div>
        {/* FileUpload */}
        {/* <div className={styles['Form-UploadFile']}>
          <FileUpload
           
          />
        </div> */}

        {/* WorkingHours */}
        <div className={styles['Form-WorkingHours']}>
          <div className={styles['WorkingHours-Row']}>
            <div className={styles['InputSwitch-Container']}>
              <h4 className='heading heading-4'>
                {t('addOrganizationForm.workHours')}
              </h4>
              <div className={styles['InputSwitch-Label']}>
                <div className={styles['WorkingHours-Switch']}>
                  <InputSwitch
                    checked={allHoursEnabled}
                    onChange={handleAllHoursChange}
                  />
                </div>

                <h4 className='heading heading-6'>
                  {t('addOrganizationForm.full')}
                </h4>
              </div>
            </div>
          </div>
          {workingHours.map((row, index) => (
            <div key={index} className={styles['WorkingHours-Row']}>
              <div className={styles['WorkingHours-Group']}>
                <div className={styles['WorkingHours-Switch']}>
                  <h4 className='heading heading-6'>{t('days.monday')}</h4>
                  <InputSwitch
                    checked={row.enabled}
                    onChange={(e) => handleSwitchChange(e, index)}
                    className={styles['InputSwitch']}
                  />
                </div>
                <div className={styles['WorkingHours-Dropdowns']}>
                  <CustomDropdown
                    value={row.dropdown1Value}
                    options={dropdownOptions}
                    onChange={(value) => handleDropdown1Change(value, index)}
                    disabled={!row.enabled}
                    placeholder={t('actions.chooseOption')}
                  />

                  <CustomDropdown
                    value={row.dropdown2Value}
                    options={dropdownOptions}
                    onChange={(value) => handleDropdown2Change(value, index)}
                    disabled={!row.enabled}
                    placeholder={t('actions.chooseOption')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

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
          <Button type='submit' fill className={styles.button}>
            {t('organizations.add')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddOrganizationForm;
