import Flex from '@/components/UI/layout/flex';
import styles from './manageReservation.module.scss';
import FormField from '@/components/UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from '@/components/UI/buttons/button';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import { useTranslation } from 'react-i18next';
import { Plus } from '@blueprintjs/icons';
import { useEquipmentReservations } from '@/hooks/useEquipmentReservations';
import { EquipmentReservationSection } from '@/components/reservationSections/equipmentReservationSection';
import { useContext, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import isValidClassname from '@/utils/isValidClassname';
import classNames from 'classnames';
import useFetch from '@/hooks/useFetch';
import clientStore from '@/store/ClientStore';
import { formatPhoneOut } from '@/utils/formatters/formatPhone';
import { Client } from '@/models/Client';
import { PaymentTypeOptions } from '@/types/enums/payment';
import { OrderStatusOptions } from '@/types/enums/order';
import ToastContext from '@/context/toast';
import TrainerReservationSection from '@/components/reservationSections/trainerReservationSection';
import useTrainerReservation from '@/hooks/useTrainerReservation';
import {
  checkErrorsInReservations,
  getInitialReservationValues,
  getReservations,
  getTotalSum,
} from './helper';
import ObjectReservationSection from '@/components/reservationSections/objectReservationSection';
import useObjectReservation from '@/hooks/useObjectReservation';
import { Order } from '@/models/Order';
import { createOrder, editOrder } from './submitHandlers';
type Props = {
  initialOrder: Order | null;
};

const ManageReservationForm = ({ initialOrder }: Props) => {
  const { t } = useTranslation();
  const { showError, showSuccess, showWarn } = useContext(ToastContext);
  const { equipment, objects, trainers } = getInitialReservationValues(
    initialOrder?.reservations || [],
  );

  const {
    options,
    handleAddEmptyReservation,
    handleDeleteReservation,
    handleChangeReservationData,
    equipmentReservations,
  } = useEquipmentReservations(equipment);

  const {
    options: trainerOptions,
    trainerReservations,
    addEmptyTrainerReservation,
    deleteTrainerReservation,
    changeTrainerReservationData,
    handleChangeReservationTime,
  } = useTrainerReservation(trainers);

  const {
    orgOptions,
    objectReservations,
    addEmptyObjectReservation,
    deleteObjectReservation,
    changeObjectReservationData,
    handleChangeReservationTime: changeObjectReservationTime,
  } = useObjectReservation(objects);

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

  const setClientValues = (client: Client) => {
    formik.setFieldValue('first_name', client.first_name);
    formik.setFieldValue('last_name', client.last_name);
    formik.setFieldValue('phone', client.phone);
    formik.setFieldValue('description', client.description || '');
  };

  // Todo: remove %2B symbol after back fixes
  const { data, invokeFunction } = useFetch(
    () =>
      clientStore.getClientByPhone(
        '%2B' + formatPhoneOut(formik.values.phone).substring(1),
      ),
    [],
    true,
    setClientValues,
  );

  const formattedPaymentMethod = useMemo(() => {
    return PaymentTypeOptions.map((option) => {
      return {
        value: option,
        label: t(`payment.${option}`),
      };
    });
  }, [t]);

  const formattedOrderStatus = useMemo(() => {
    return OrderStatusOptions.map((option) => {
      return {
        value: option,
        label: t(`status.${option}`),
      };
    });
  }, [t]);

  const initialValues = {
    first_name: initialOrder?.client?.first_name || '',
    last_name: initialOrder?.client?.last_name || '',
    phone: initialOrder?.client?.phone || '',
    description: initialOrder?.client?.description || '',
    payment:
      formattedPaymentMethod.find(
        (el) => el.value === initialOrder?.payment_method,
      ) || formattedPaymentMethod[0],
    status:
      formattedOrderStatus.find((el) => el.value === initialOrder?.status) ||
      formattedOrderStatus[0],
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      const reservations = getReservations(
        equipmentReservations,
        trainerReservations,
        objectReservations,
      );

      if (!reservations) {
        return;
      }

      const reservationsErrorMessage = checkErrorsInReservations(
        equipmentReservations,
        trainerReservations,
        objectReservations,
        t,
      );

      if (reservationsErrorMessage) {
        showWarn(reservationsErrorMessage);
        return;
      }

      const { successMsg, errorMsg } = initialOrder?.id
        ? await editOrder(initialOrder.id, values)
        : await createOrder(values, reservations);

      if (errorMsg) {
        showError(errorMsg);
      }

      showSuccess(successMsg);
    },
  });

  const formattedPhone = useMemo(() => {
    return formatPhoneOut(formik.values.phone);
  }, [formik.values.phone]);

  const handlePhoneChange = (e: InputMaskChangeEvent) => {
    const phoneNumberLength = 13;

    if (formattedPhone.length === phoneNumberLength) {
      invokeFunction();
    }

    formik.handleChange(e);
  };

  const isInputsBlocked =
    (!!data && formattedPhone.length === 13) || !!initialOrder;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <div className={styles.formSection}>
          <h4 className='heading heading-4 heading-primary'>
            {t('schedule.form.clientSection.clientInfo')}
          </h4>
          <FormField
            label={t('forms.phone')}
            isValid={!(formik.touched.phone && formik.errors.phone)}
            invalidMessage={formik.errors.phone}
          >
            <InputMask
              name='phone'
              mask='+38 (999) 999-9999'
              placeholder='+38 (___) ___-____'
              disabled={isInputsBlocked}
              value={formik.values.phone}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'phone'))}
            />
          </FormField>
          <FormField
            label={t('forms.firstName')}
            isValid={!(formik.touched.first_name && formik.errors.first_name)}
            invalidMessage={formik.errors.first_name}
          >
            <InputText
              placeholder={t('forms.enterFirstName')}
              name='first_name'
              value={formik.values.first_name}
              disabled={isInputsBlocked}
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
              disabled={isInputsBlocked}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'last_name'))}
            />
          </FormField>

          <FormField label={t('forms.description')}>
            <InputTextarea
              placeholder={t(
                'schedule.form.clientSection.organizationDescription',
              )}
              autoResize
              rows={5}
              disabled={isInputsBlocked}
              name='description'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </FormField>
        </div>

        {objectReservations.map((reservation, index) => (
          <ObjectReservationSection
            isEditingMode={!!initialOrder}
            objectReservation={reservation}
            key={reservation.id}
            reservationNumber={index + 1}
            orgOptions={orgOptions}
            onReservationTimeChange={changeObjectReservationTime}
            onDataChange={changeObjectReservationData}
            onDelete={deleteObjectReservation}
          />
        ))}

        {trainerReservations.map((reservation, index) => (
          <TrainerReservationSection
            isEditingMode={!!initialOrder}
            key={reservation.id}
            trainerReservation={reservation}
            reservationNumber={index + 1}
            onDataChange={changeTrainerReservationData}
            onDelete={deleteTrainerReservation}
            onReservationTimeChange={handleChangeReservationTime}
            options={trainerOptions}
          />
        ))}

        {equipmentReservations.map((reservation, index) => (
          <EquipmentReservationSection
            isEditingMode={!!initialOrder}
            key={reservation.id}
            equipmentReservation={reservation}
            onChange={handleChangeReservationData}
            onDelete={handleDeleteReservation}
            options={options}
            reservationNumber={index + 1}
          />
        ))}

        <Flex options={{ direction: 'column', gap: 1 }}>
          <h4 className='heading heading-5'>{t('schedule.form.addToOrder')}</h4>

          <Flex options={{ justify: 'space-between', gap: 1 }}>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              onClick={addEmptyObjectReservation}
              fill
              outlined
            >
              <h3 className='heading heading-3'>
                {t('schedule.form.reservation')}
              </h3>
            </Button>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              fill
              outlined
              onClick={addEmptyTrainerReservation}
            >
              <h3 className='heading heading-3'>
                {t('schedule.form.trainer')}
              </h3>
            </Button>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              onClick={handleAddEmptyReservation}
              fill
              outlined
            >
              <h3 className='heading heading-3'>
                {t('schedule.form.equipment')}
              </h3>
            </Button>
          </Flex>
        </Flex>

        <div className={styles.formSection}>
          <FormField label={t('schedule.form.paymentMethod')}>
            <CustomDropdown
              name='payment.value'
              value={formik.values.payment?.value}
              onChange={formik.handleChange}
              placeholder={t('schedule.form.choosePaymentMethod')}
              options={formattedPaymentMethod}
            />
          </FormField>
        </div>

        <div className={styles.formSection}>
          <FormField label={t('forms.status')}>
            <CustomDropdown
              name='status.value'
              value={formik.values.status.value}
              onChange={formik.handleChange}
              options={formattedOrderStatus}
              disabled={initialOrder === null}
            />
          </FormField>
        </div>

        <Flex
          className={styles.formSection}
          options={{ direction: 'column', gap: 1.25 }}
        >
          <h4 className='heading heading-4'>{t('schedule.form.totalSum')}</h4>
          <h4 className='heading heading-4'>{`₴${getTotalSum(
            equipmentReservations,
            trainerReservations,
            objectReservations,
          )}`}</h4>
        </Flex>

        <Flex options={{ justify: 'flex-end', gap: 1 }}>
          <Button severity='danger' fill className={styles.btn}>
            {t('actions.clear')}
          </Button>
          <Button type='submit' fill className={styles.btn}>
            {t('actions.create')}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default ManageReservationForm;
