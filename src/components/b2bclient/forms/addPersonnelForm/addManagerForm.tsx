import ModalContext from '@/context/modal';
import ToastContext from '@/context/toast';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import styles from './addManagerForm.module.scss';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import FormField from '@/components/UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { IManager } from '@/models/IManager';
import Button from '@/components/UI/buttons/button';
import { InputTextarea } from 'primereact/inputtextarea';
import {
  CreateManagerDTO,
  UpdateManagerDTO,
} from '@/models/requests/ManagerRequests';
import { observer } from 'mobx-react-lite';
import personnelStore from '@/store/PersonnelStore';
import authStore from '@/store/AuthStore';

const AddManagerForm: React.FC = observer(() => {
  const { t } = useTranslation();
  // const { showSuccess, showError } = useContext(ToastContext);
  const { showModal } = useContext(ModalContext);
  const user = authStore.user;
  // const handleShowModalAndSubmit = async () => {
  //   const res = await showModal(t('forms.areYouSure'));
  //   if (res) {
  //     await formik.handleSubmit();
  //   }
  // };

  const validationSchema = Yup.object({
    first_name: Yup.string().required(t('invalid.required')),
    last_name: Yup.string().required(t('invalid.required')),
    description: Yup.string(),
  });

  const formData = {
    first_name: '',
    last_name: '',
    description: '',
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { data, error } = await personnelStore.createManager(values);
    },
  });

  // const handleDeleteUser = async () => {
  //   if (!initialValues) {
  //     return;
  //   }
  //   return await clientsStore.deleteClient(initialValues.id!);
  // };

  const handleClearForm = () => formik.resetForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.form}>
        <h4 className='heading heading-4 heading-primary'>
          {t('forms.overallInfo')}
        </h4>
      </div>
    </form>
  );
});

export default AddManagerForm;
