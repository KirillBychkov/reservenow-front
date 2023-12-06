import Button from '@/components/UI/buttons/button';
import FormField from '@/components/UI/fields/formField';
import Flex from '@/components/UI/layout/flex';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useTranslation } from 'react-i18next';
import styles from './manageClientForm.module.scss';
import { useFormik } from 'formik';
import { Client } from '@/models/Client';
import * as yup from 'yup';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';
import { Dropdown } from 'primereact/dropdown';
import { useContext, useMemo } from 'react';
import ModalContext from '@/context/modal';
import { useNavigate } from 'react-router-dom';
import ToastContext from '@/context/toast';
import clientStore from '@/store/ClientStore';
import { observer } from 'mobx-react-lite';
import { ClientStatusOption } from '@/types/enums/client';
import { ClientFormData } from '@/types/client';
import { createClient, updateClient } from './submitHandlers';

type Props = {
  initValues?: Client;
};

const ManageClientForm = observer(({ initValues }: Props) => {
  const { t } = useTranslation();
  const { showModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { showError, showSuccess } = useContext(ToastContext);

  const validationSchema = yup.object({
    first_name: yup.string().required(t('invalid.required')),
    last_name: yup.string().required(t('invalid.required')),
    phone: yup
      .string()
      .required(t('invalid.required'))
      .test('phone', t('invalid.phone'), (value) => {
        if (value) {
          return !value.includes('_');
        }
        return false;
      }),
  });

  const handleShowModalAndDelete = async () => {
    const res = await showModal(t('forms.areYouSure'));
    if (!res || !initValues) {
      return;
    }

    const { successMsg, errorMsg } = await clientStore.deleteClient(
      initValues?.id,
    );

    if (errorMsg) {
      showError(errorMsg);
      return;
    }

    showSuccess(successMsg);
    navigate('/clients');
  };

  const handleResetForm = () => formik.resetForm();

  const formattedClientStatusOptions = useMemo(() => {
    return ClientStatusOption.map((value) => {
      const lowerCaseValue = value.toLowerCase();

      return {
        value: lowerCaseValue,
        label: t(`status.${lowerCaseValue}`),
      };
    });
  }, [t]);

  const initialValues: ClientFormData = useMemo(() => {
    return {
      first_name: initValues?.first_name || '',
      last_name: initValues?.last_name || '',
      phone: initValues?.phone || '',
      description: initValues?.description || '',
      status: formattedClientStatusOptions.find(
        (el) => el.value === initValues?.status,
      ),
    }; 
  }, [formattedClientStatusOptions, initValues])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { successMsg, errorMsg } = initValues?.id
        ? await updateClient(values, initValues.id)
        : await createClient(values, resetForm);

      if (errorMsg) {
        showError(errorMsg);
        return;
      }

      showSuccess(successMsg);
    },
  });

  return (
    <form>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <Flex
          className={styles.formSection}
          options={{ direction: 'column', gap: 1 }}
        >
          <h4 className='heading heading-4 heading-primary'>
            {t('forms.overallInfo')}
          </h4>
          <FormField
            label={t('forms.firstName')}
            isValid={!(formik.touched.first_name && formik.errors.first_name)}
            invalidMessage={formik.errors.first_name}
          >
            <InputText
              placeholder={t('forms.enterFirstName')}
              name='first_name'
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'first_name'))}
            />
          </FormField>

          <FormField
            label={t('forms.lastName')}
            isValid={!(formik.touched.last_name && formik.errors.last_name)}
            invalidMessage={formik.errors.last_name}
          >
            <InputText
              placeholder={t('forms.enterLastName')}
              name='last_name'
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'last_name'))}
            />
          </FormField>

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

          {initValues?.id && (
            <FormField label={t('clients.status')}>
              <Dropdown
                name='status.value'
                style={{ width: '100%' }}
                value={formik.values.status?.value}
                options={formattedClientStatusOptions}
                onChange={formik.handleChange}
              />
            </FormField>
          )}

          <FormField label={t('forms.description')}>
            <InputTextarea
              autoResize
              rows={7}
              placeholder={t('forms.enterDescription')}
            />
          </FormField>
        </Flex>

        <Flex options={{ justify: 'flex-end', gap: 1 }}>
          {initValues?.id && (
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
            onClick={handleResetForm}
            fill
            className={styles.btn}
          >
            {t('actions.cancel')}
          </Button>
          <Button fill className={styles.btn}>
            {t('actions.save')}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
});

export default ManageClientForm;
