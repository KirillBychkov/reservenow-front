import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './manageOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { MainInfo } from './mainInfo';
import { SecondaryInfo } from './secondaryInfo';
import { transformWorkingHours } from '@/utils/formHelpers/formHelpers';
import { WorkingHours } from '../../../UI/workingHours/workingHours';
import { observer } from 'mobx-react-lite';
import ToastContext from '@/context/toast';
import { OrganizationFormData } from '@/types/organization';
import { Organization } from '@/models/Organization';
import { createOrganization, updateOrganization } from './submitHandlers';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileUpload } from '@/components/UI/fileUpload/FileUpload';
import { formatObjectIn } from '@/utils/formatters/formatObject';

interface Props {
  initialValues?: Organization;
}

const ManageOrganizationForm: React.FC<Props> = observer(
  ({ initialValues }) => {
    const { t } = useTranslation();
    const { showSuccess, showError } = useContext(ToastContext);
    const { ref, handleSelect, handleClearFile, fileName } = useFileUpload();

    if (initialValues) initialValues = formatObjectIn(initialValues);

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
        showSuccess(res.successMsg);
      },
    });

    const handleClearForm = () => {
      formik.resetForm();
    };

    return (
      <form onSubmit={formik.handleSubmit} className={styles.Form}>
        <MainInfo formik={formik} />
        <SecondaryInfo formik={formik} />
        <div className={styles.section}>
          <FileUpload
            fileUploadRef={ref}
            onChange={handleSelect}
            onClear={handleClearFile}
            fileName={fileName}
          />
        </div>
        <WorkingHours<OrganizationFormData> formik={formik} />
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
            {initialValues ? t('organizations.edit') : t('organizations.add')}
          </Button>
        </div>
      </form>
    );
  },
);

export default ManageOrganizationForm;
