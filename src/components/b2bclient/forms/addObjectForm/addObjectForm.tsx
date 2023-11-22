import React, { useContext } from 'react';
import styles from './addObjectForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '@/components/UI/fields/formField';
import { InputNumber } from 'primereact/inputnumber';
import { WorkingHours } from './workingHours';
import { IObject } from '@/models/IObject';
import { CreateRentalObjectDTO } from '@/models/requests/ObjectsRequests';
import { InputMask } from 'primereact/inputmask';
import Button from '@/components/UI/buttons/button';
import { useParams } from 'react-router-dom';
import {
  finalizeWorkingHours,
  transformWorkingHours,
} from '@/utils/formHelpers/formHelpers';
import { ObjectFormData } from '@/types/objects';
import { observer } from 'mobx-react-lite';
import objectsStore from '@/store/ObjectsStore';
import ToastContext from '@/context/toast';

interface Props {
  initialValues?: IObject;
}

const AddObjectForm: React.FC<Props> = observer(({ initialValues }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const { id: organizationId } = useParams();
  const validationSchema = Yup.object({});

  const workingHours = transformWorkingHours<IObject>(initialValues);

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
      const workingHours = finalizeWorkingHours(values.workingHours);
      const object: CreateRentalObjectDTO = {
        organizationId: parseInt(organizationId || '0'),
        address: values.address,
        phone: values.phone,
        name: values.name,
        description: values.description,
        price_per_hour: values.price,
        ...workingHours,
      };
      const { successMsg, errorMsg } = await objectsStore.addRentalObject(
        object
      );
      if (errorMsg) {
        showError(errorMsg);
        return;
      }
      showSuccess(successMsg);
      formik.resetForm();
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formSection}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
        <FormField label={t('forms.name')}>
          <InputText
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('forms.enterName')}
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
        <FormField label={t('forms.phone')}>
          <InputMask
            name='phone'
            mask='+38 (999) 999-9999'
            placeholder='+38 (___) ___-____'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          {t('organizations.add')}
        </Button>
      </div>
    </form>
  );
});

export default AddObjectForm;
