import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/UI/buttons/button';
import styles from './addOrganizationForm.module.scss';
import { useTranslation } from 'react-i18next';
import { MainInfo } from './mainInfo';
import { SecondaryInfo } from './secondaryInfo';
import {
  finalizeWorkingHours,
  transformWorkingHours,
} from '@/utils/formHelpers/formHelpers';
import { WorkingHours } from '../addObjectForm/workingHours';
import { ICreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import organizationStore from '@/store/OrganizationsStore';
import { observer } from 'mobx-react-lite';
import ToastContext from '@/context/toast';
import { OrganizationFormData } from '@/types/organization';

const AddOrganizationForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useContext(ToastContext);
  const validationSchema = Yup.object({});

  const workingHours = transformWorkingHours();

  const formData: OrganizationFormData = {
    name: '',
    description: '',
    phone: '',
    address: '',
    workingHours,
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const workingHours = finalizeWorkingHours(values.workingHours);
      const organization: ICreateOrganizationDTO = {
        name: values.name,
        description: values.description,
        phone: values.phone,
        address: values.address,
        ...workingHours,
      };
      const { successMsg, errorMsg } = await organizationStore.addOrganization(
        organization
      );
      if (errorMsg) {
        showError(errorMsg);
        return;
      }
      showSuccess(successMsg);
      handleClearForm();
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
});

export default AddOrganizationForm;
