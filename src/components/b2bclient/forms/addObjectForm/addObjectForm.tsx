import React from 'react';
import styles from './addObjectForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import { InputNumber } from 'primereact/inputnumber';
import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { WorkingHours } from './workingHours';
import { IObject } from '@/models/IObject';

export interface Week {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

export interface Day {
  enabled: boolean;
  start: number | null;
  end: number | null;
}

const initializeWorkingHours = (initialWorkingHours?: WeekWorkingHours) => {
  const workingHours: Week = {
    monday: {
      enabled: false,
      start: null,
      end: null,
    },
    tuesday: {
      enabled: false,
      start: null,
      end: null,
    },
    wednesday: {
      enabled: false,
      start: null,
      end: null,
    },
    thursday: {
      enabled: false,
      start: null,
      end: null,
    },
    friday: {
      enabled: false,
      start: null,
      end: null,
    },
    saturday: {
      enabled: false,
      start: null,
      end: null,
    },
    sunday: {
      enabled: false,
      start: null,
      end: null,
    },
  };

  if (!initialWorkingHours) {
    return workingHours;
  }

  for (const key in initialWorkingHours) {
    const day = key.split('_')[0];
    const time = key.split('_')[1];
    const value = initialWorkingHours[key as keyof WeekWorkingHours];
    if (!value) continue;
    workingHours[day as keyof Week].enabled = true;
    if (time === 'start') {
      workingHours[day as keyof Week].start = value;
    } else {
      workingHours[day as keyof Week].end = value;
    }
  }

  return workingHours;
};

export interface ObjectFormData {
  name: string;
  description: string;
  price: number;
  workingHours: Week;
}

const extractWorkingHours = <T extends WeekWorkingHours>(initialValues?: T) => {
  if (!initialValues) return initializeWorkingHours();
  const initialWorkingHours = {} as T;

  Object.entries(initialValues).forEach(([key, value]) => {
    if (key.includes('hours')) {
      initialWorkingHours[key as keyof T] = value;
    }
  });

  return initializeWorkingHours(initialWorkingHours);
};

interface Props {
  initialValues?: IObject;
}

const AddObjectForm: React.FC<Props> = ({ initialValues }) => {
  const { t } = useTranslation();
  const validationSchema = Yup.object({});

  const workingHours = extractWorkingHours<IObject>(initialValues);

  const formData: ObjectFormData = {
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    price: initialValues?.price_per_hour || 0,
    workingHours,
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.values);

  return (
    <form className={styles.form}>
      <div className={styles.formSection}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
        <div>
          <FormField label={t('forms.name')}>
            <InputText
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('forms.enterName')}
            />
          </FormField>
        </div>
        <div>
          <FormField label={t('objects.description')}>
            <InputTextarea
              autoResize
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder={t('forms.enterDescription')}
              rows={6}
            />
          </FormField>
        </div>
      </div>
      <div className={styles.formSection}>
        <FormField label={t('forms.price')}>
          <InputNumber
            style={{ width: '100%' }}
            type='text'
            name='price'
            mode='currency'
            currency='UAH'
            locale='uk-UA'
            placeholder={t('forms.enterPrice')}
            value={formik.values.price}
            onChange={(e) => formik.setFieldValue('price', e.value)}
            onBlur={formik.handleBlur}
          />
        </FormField>
      </div>
      {/* <div className={styles.formSection}>
        <FileUpload fileUploadRef={fileUploadRef} onSelect={handleFileSelect} />
      </div> */}
      <div className={styles.section}>
        <WorkingHours week={formik.values.workingHours} formik={formik} />
      </div>
    </form>
  );
};

export default AddObjectForm;
