import FormField from '../../../UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import * as yup from 'yup';
import styles from './manageEquipmentForm.module.scss';
import Flex from '../../../UI/layout/flex';
import Button from '../../../UI/buttons/button';
import { InputNumber } from 'primereact/inputnumber';
import { observer } from 'mobx-react-lite';
import { Equipment } from '@/models/Equipment';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import ModalContext from '@/context/modal';
import { useContext } from 'react';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import equipmentStore from '@/store/EquipmentStore';
import ToastContext from '@/context/toast';
import { EquipmentFormData } from '@/types/equipment';
import { createEquipment, updateEquipment } from './submitHandlers';
import { useNavigate } from 'react-router-dom';

type Props = {
  initialValues?: Equipment;
};

export const ManageEquipmentForm = observer(({ initialValues }: Props) => {
  const { t } = useTranslation();
  const { showModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { showError, showSuccess } = useContext(ToastContext);

  const handleShowModalAndSubmit = async () => {
    const res = await showModal(t('forms.areYouSure'));
    if (res) {
      formik.handleSubmit();
    }
  };

  const handleShowModalAndDelete = async () => {
    const res = await showModal(t('forms.areYouSure'));
    if (!res || !initialValues) {
      return;
    }

    const { successMsg, errorMsg } = await equipmentStore.deleteEquipment(
      initialValues.id,
    );

    if (errorMsg) {
      showError(errorMsg);
      return;
    }

    showSuccess(successMsg);
    navigate('/equipment');
  };

  const formData: EquipmentFormData = {
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    price_per_hour: initialValues?.price_per_hour || 0,
  };

  const validationSchema = yup.object({
    name: yup.string().required(t('invalid.required')),
    price_per_hour: yup
      .number()
      .required(t('invalid.required'))
      .positive(t('invalid.positiveOnly')),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { successMsg, errorMsg } = initialValues?.id
        ? await updateEquipment(values, initialValues.id)
        : await createEquipment(values, resetForm);

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
    },
  });

  const handleFormReset = () => formik.resetForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <div className={styles.formSection}>
          <h4 className='heading heading-4 heading-primary'>
            {t('forms.overallInfo')}
          </h4>
          <FormField
            label={t('forms.equipmentName')}
            isValid={!(formik.touched.name && formik.errors.name)}
            invalidMessage={formik.errors.name}
          >
            <InputText
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('forms.enterEquipmentName')}
              className={classNames(isValidClassname(formik, 'name'))}
            />
          </FormField>
          <FormField label={t('forms.description')}>
            <InputTextarea
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              autoResize
              rows={7}
              placeholder={t('forms.enterDescription')}
            />
          </FormField>
        </div>

        <div className={styles.formSection}>
          <FormField
            label={t('forms.equipmentPrice')}
            isValid={
              !(formik.touched.price_per_hour && formik.errors.price_per_hour)
            }
            invalidMessage={formik.errors.price_per_hour}
          >
            <InputNumber
              name='price_per_hour'
              value={formik.values.price_per_hour}
              onChange={(e) => {
                formik.setFieldValue('price_per_hour', e.value);
              }}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'price_per_hour'))}
              size={100}
              type='text'
              mode='currency'
              currency='UAH'
              locale='uk-UA'
            />
          </FormField>
        </div>

        <Flex options={{ justify: 'flex-end', gap: 1 }}>
          {initialValues?.id && (
            <Button
              severity='secondary'
              fill
              className={styles.btn}
              outlined
              onClick={handleShowModalAndDelete}
            >
              {t('actions.delete')}
            </Button>
          )}
          <Button
            severity='danger'
            fill
            className={styles.btn}
            onClick={handleFormReset}
          >
            {t('actions.clear')}
          </Button>
          <Button
            onClick={handleShowModalAndSubmit}
            fill
            className={styles.btn}
          >
            {t('actions.addEquipment')}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
});
