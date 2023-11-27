import React, { useContext } from 'react';
import styles from './manageObjectForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import { InputNumber } from 'primereact/inputnumber';
import { WorkingHours } from '../../../UI/workingHours/workingHours';
import { RentalObject } from '@/models/RentalObject';
import { InputMask } from 'primereact/inputmask';
import Button from '@/components/UI/buttons/button';
import { useParams } from 'react-router-dom';
import { transformWorkingHours } from '@/utils/formHelpers/formHelpers';
import { ObjectFormData } from '@/types/objects';
import { observer } from 'mobx-react-lite';
import ToastContext from '@/context/toast';
import { createObject, updateObject } from './submitHandlers';
import { FileUpload } from '@/components/UI/fileUpload/FileUpload';
import { useFileUpload } from '@/hooks/useFileUpload';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import { formatObjectPriceToUpperUnit } from '@/utils/formatters/formatPrice';

interface Props {
  initialValues?: RentalObject;
}

const ManageObjectForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const { id: organizationId, objectId } = useParams();
  const { ref, handleSelect, handleClearFile, fileName } = useFileUpload();

  if (initialValues) {
    initialValues = formatObjectPriceToUpperUnit(initialValues);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(t('invalid.required')),
    description: Yup.string(),
    phone: Yup.string().required(t('invalid.required')),
    address: Yup.string().required(t('invalid.required')),
    price: Yup.number().required(t('invalid.required')),
  });

  const workingHours = transformWorkingHours<RentalObject>(initialValues);

  const formData: ObjectFormData = {
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
    price: initialValues?.price_per_hour || 0,
    workingHours,
  };

  const handleClearForm = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: async (values) => {
      const file = ref.current?.getFiles()[0];
      const res = objectId
        ? await updateObject(values, parseInt(objectId), file)
        : await createObject(values, file, organizationId, handleClearForm);

      if (res.errorMsg) {
        showError(res.errorMsg);
        return;
      }
      showSuccess(res.successMsg);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formSection}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
        <FormField
          label={t('forms.name')}
          isValid={!(formik.touched.name && formik.errors.name)}
          invalidMessage={formik.errors.name}
        >
          <InputText
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterName')}
            className={classNames(isValidClassname(formik, 'name'))}
          />
        </FormField>
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
      <div className={styles.formSection}>
        <h4 className='heading heading-4 '>{t('forms.info')}</h4>
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
        <FormField label={t('forms.address')}>
          <InputText
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterAddress')}
          />
        </FormField>
        <FormField
          label={t('forms.price')}
          isValid={!(formik.touched.price && formik.errors.price)}
          invalidMessage={formik.errors.price}
        >
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
            className={classNames(isValidClassname(formik, 'price'))}
          />
        </FormField>
      </div>
      <div className={styles.formSection}>
        <FileUpload
          fileUploadRef={ref}
          onChange={handleSelect}
          onClear={handleClearFile}
          fileName={fileName}
        />
      </div>
      <div className={styles.section}>
        <WorkingHours<ObjectFormData> formik={formik} />
      </div>
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
          {initialValues ? t('objects.edit') : t('objects.add')}
        </Button>
      </div>
    </form>
  );
});

export default ManageObjectForm;
