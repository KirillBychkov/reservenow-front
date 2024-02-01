import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './manageOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { MainInfo } from './mainInfo';
import { SecondaryInfo } from './secondaryInfo';
import { transformWorkingHours } from '@/utils/formHelpers/formHelpers';
import { WorkingHours } from '@/components/UI/workingHours/workingHours';
import { observer } from 'mobx-react-lite';
import ToastContext from '@/context/toast';
import { OrganizationFormData } from '@/types/organization';
import { Organization } from '@/models/Organization';
import { createOrganization, updateOrganization } from './submitHandlers';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileUpload } from '@/components/UI/fileUpload/FileUpload';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import organizationStore from '@/store/organizationsStore';
import { useNavigate } from 'react-router-dom';
import Flex from '@/components/UI/layout/flex';

interface Props {
  initialValues?: Organization;
}

const ManageOrganizationForm: React.FC<Props> = observer(
  ({ initialValues }) => {
    const { t, i18n } = useTranslation();
    const { showSuccess, showError } = useContext(ToastContext);
    const { ref, handleSelect, handleClearFile, fileName, handleDrop } =
      useFileUpload();
    const navigate = useNavigate();
    const [image, setImage] = useState(initialValues?.photo || null);

    if (initialValues)
      initialValues = formatObjectIn(initialValues, i18n.language);

    const validationSchema = Yup.object({
      name: Yup.string().required(t('invalid.required')),
      description: Yup.string(),
      phone: Yup.string().required(t('invalid.required')),
      address: Yup.string().required(t('invalid.required')),
    });

    const workingHours = transformWorkingHours(initialValues);

    const formData: OrganizationFormData = {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      phone: initialValues?.phone || '',
      address: initialValues?.address || '',
      workingHours,
    };

    const handleDelete = async () => {
      if (!initialValues) {
        return;
      }
      const { successMsg, errorMsg } =
        await organizationStore.deleteOrganization(initialValues?.id);

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
      navigate('/organizations');
    };

    const handleImageDelete = async () => {
      const { successMsg, errorMsg } = await organizationStore.deleteImage(
        initialValues?.id as number,
      );

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
      setImage(null);
    };

    const formik = useFormik({
      initialValues: formData,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const file = ref.current?.getFiles()[0];

        const res = initialValues
          ? await updateOrganization(initialValues.id, values, file)
          : await createOrganization(values, file, handleClearForm);

        handleClearFile();
        if (res.errorMsg) {
          showError(res.errorMsg);
          return;
        }

        if (file) {
          const reader = new FileReader();
          reader.addEventListener('load', () =>
            setImage(reader.result as string),
          );
          reader.readAsDataURL(file);
        }
        showSuccess(res.successMsg);
      },
    });

    const handleClearForm = () => {
      formik.resetForm();
      formik.setFieldValue('workingHours', workingHours);
    };

    return (
      <form onSubmit={formik.handleSubmit} className={styles.Form}>
        <MainInfo formik={formik} />
        <SecondaryInfo formik={formik} />
        <div className={styles.section}>
          <h4 className='heading heading-4 '>
            {t('addOrganizationForm.image')}
          </h4>
          {image ? (
            <Flex
              className={styles.imageContainer}
              options={{ direction: 'column', gap: 0.625 }}
            >
              <img
                className={styles.image}
                src={image}
                alt={`${initialValues?.name} image`}
              />
              <Button className='imageButton' onClick={handleImageDelete}>
                {t('forms.deleteImage')}
              </Button>
            </Flex>
          ) : (
            <FileUpload
              onBeforeDrop={handleDrop}
              fileUploadRef={ref}
              onChange={handleSelect}
              onClear={handleClearFile}
              fileName={fileName}
            />
          )}
        </div>
        <WorkingHours<OrganizationFormData> formik={formik} />
        <div className={styles.Controls}>
          {initialValues?.id && (
            <Button
              severity='secondary'
              fill
              className={styles.Button}
              outlined
              onClick={handleDelete}
            >
              {t('actions.delete')}
            </Button>
          )}
          <Button
            severity='danger'
            fill
            className={styles.Button}
            onClick={handleClearForm}
          >
            {t('actions.cancel')}
          </Button>
          <Button type='submit' fill className={styles.Button}>
            {initialValues ? t('organizations.edit') : t('organizations.add')}
          </Button>
        </div>
      </form>
    );
  },
);

export default ManageOrganizationForm;
