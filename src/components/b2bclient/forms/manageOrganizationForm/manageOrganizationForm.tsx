import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './manageOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { MainInfo } from './mainInfo';
import { SecondaryInfo } from './secondaryInfo';
import { transformWorkingHours } from '@/utils/formHelpers/formHelpers';
import { WorkingHours } from '../manageObjectForm/workingHours';
import { observer } from 'mobx-react-lite';
import ToastContext from '@/context/toast';
import { OrganizationFormData } from '@/types/organization';
import { Organization } from '@/models/Organization';
import { createOrganization, updateOrganization } from './submitHandlers';

interface Props {
  initialValues?: Organization;
}

const ManageOrganizationForm: React.FC<Props> = observer(
  ({ initialValues }) => {
    const { t } = useTranslation();
    const { showSuccess, showError } = useContext(ToastContext);
    const validationSchema = Yup.object({});

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
        const res = initialValues
          ? await updateOrganization(values, initialValues.id)
          : await createOrganization(values);

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
            {t('organizations.add')}
          </Button>
        </div>
      </form>
    );
  }
);

export default ManageOrganizationForm;
