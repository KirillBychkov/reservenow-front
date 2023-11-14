import React, { useRef, useState } from 'react';
import styles from './addObjectForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from '@/components/UI/fileUpload/FileUpload';
import { FileUpload as PrFileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { WorkingHours } from '../addOrganizationForm/workingHours';

const AddObjectForm: React.FC = () => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(null);
  const fileUploadRef = useRef<PrFileUpload>(null);
  console.log(fileName);

  const handlerClearFile = () => {
    fileUploadRef.current?.clear();
    setFileName(null);
  };

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
  };

  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            name='price'
            mode='currency'
            currency='UAH'
            locale='uk-UA'
            placeholder={t('forms.enterPrice')}
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormField>
      </div>
      <div className={styles.formSection}>
        <FileUpload fileUploadRef={fileUploadRef} onSelect={handleFileSelect} />
      </div>
      <div className={styles.section}>
        <WorkingHours />
      </div>
    </form>
  );
};

export default AddObjectForm;
