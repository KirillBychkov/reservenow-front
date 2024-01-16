import { useTranslation } from 'react-i18next';
import styles from './reservationSections.module.scss';
import Flex from '../UI/layout/flex';
import { Cross } from '@blueprintjs/icons';
import FormField from '../UI/fields/formField';
import CustomDropdown from '../UI/dropdown/customDropdown';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import {
  ObjectReservation,
  OrganizationOption,
} from '@/hooks/useObjectReservation';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { ChangeEvent, useEffect, useMemo } from 'react';
import objectsStore from '@/store/objectsStore';
import useFetch from '@/hooks/useFetch';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RentalObject } from '@/models/RentalObject';
import { generateDropdownOptions, getTimeOnCertainDay } from './helper';
import * as yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';

type Props = {
  objectReservation: ObjectReservation;
  orgOptions: OrganizationOption[];
  reservationNumber: number;
  onDelete: (id: string) => void;
  onDataChange: (
    id: string,
    data: { rental_object?: RentalObject | null; description?: string },
  ) => void;
  onReservationTimeChange: (
    id: string,
    time: { start?: string | null; end?: string | null },
  ) => void;
  isEditingMode: boolean;
  isSubmitting: boolean;
};

const ObjectReservationSection = ({
  orgOptions,
  onDelete,
  reservationNumber,
  objectReservation,
  onDataChange,
  onReservationTimeChange,
  isEditingMode,
  isSubmitting,
}: Props) => {
  const { t, i18n } = useTranslation();
  const {
    rental_object,
    id,
    reservation_time_end,
    reservation_time_start,
    description,
  } = objectReservation;

  const dateOfStart = reservation_time_start
    ? new Date(reservation_time_start)
    : null;

  const validationSchema = yup.object({
    organization: yup.object().required(t('invalid.required')),
    rental_object: yup.object().required(t('invalid.required')),
    date: yup.date().required(t('invalid.required')),
    startHours: yup.number().required(t('invalid.required')),
    endHours: yup.number().required(t('invalid.required')),
  });

  const initialValues = {
    organization: rental_object?.organization || null,
    rental_object: rental_object?.name || null,
    date: dateOfStart ? new Date(dateOfStart) : null,
    startHours: dateOfStart?.getHours() || null,
    endHours: reservation_time_end
      ? new Date(reservation_time_end as string)?.getHours()
      : null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit() {},
  });

  useEffect(() => {
    if (isSubmitting) {
      formik.submitForm();
    }
  }, [isSubmitting]);

  const time =
    rental_object &&
    getTimeOnCertainDay(rental_object, formik.values.date?.getDay() as number);
  const isWorkingDay = time?.start !== null && time?.end !== null;

  const resetHours = async () => {
    await formik.setFieldValue('endHours', null);
    await formik.setFieldValue('startHours', null);
  };

  const fullResetOfTime = async () => {
    resetHours();
    formik.setFieldValue('date', null);
    onReservationTimeChange(id, { start: null, end: null });
  };

  const handleDateChange = (e: CalendarChangeEvent) => {
    formik.handleChange(e);
    const { startHours, endHours } = formik.values;

    if (startHours || endHours) {
      resetHours();
    }
    if (reservation_time_end || reservation_time_start) {
      onReservationTimeChange(id, { start: null, end: null });
    }
  };

  const { data: objects, isLoading } = useFetch(
    () => objectsStore.getRentalObjects({}, formik.values.organization?.id),
    [formik.values.organization],
    { disabled: formik.values.organization === null },
  );

  const objectOptions = useMemo(() => {
    return objects?.map((object) => ({
      label: object.name,
      object: formatObjectIn(object, i18n.language),
    }));
  }, [formik.values.organization, objects]);

  const handleOrgChange = (e: DropdownChangeEvent) => {
    formik.setFieldValue('organization', e.target.value.organization);
    if (rental_object) {
      onDataChange(id, {
        rental_object: null,
      });
      formik.setFieldValue('rental_object', null);
    }

    fullResetOfTime();
  };

  const handleObjectChange = (e: DropdownChangeEvent) => {
    onDataChange(id, {
      rental_object: e.target.value.object as RentalObject,
    });
    formik.setFieldValue('rental_object', e.target.value.object);

    fullResetOfTime();
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange(id, {
      description: e.target.value,
    });
  };

  const handleFromHoursChange = (e: DropdownChangeEvent) => {
    formik.handleChange(e);
    const fromHours = e.target.value as number;
    const { date, endHours } = formik.values;
    const start = new Date(date?.setHours(fromHours) as number).toISOString();
    onReservationTimeChange(id, {
      start,
      end: fromHours >= (endHours as number) ? null : undefined,
    });
    if (fromHours >= (endHours as number)) {
      formik.setFieldValue('endHours', null);
    }
  };

  const handleToHoursChange = (e: DropdownChangeEvent) => {
    formik.handleChange(e);
    const endHours = e.target.value as number;
    const end = new Date(
      formik.values.date?.setHours(endHours) as number,
    ).toISOString();

    onReservationTimeChange(id, { end });
  };

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.objectSection.header', { reservationNumber })}
        </h4>

        {!isEditingMode && (
          <Cross
            className={styles.cross}
            color='#B8B8BA'
            onClick={() => onDelete(id)}
          />
        )}
      </Flex>

      <Flex options={{ gap: 1 }}>
        <div className={styles.halfSection}>
          <FormField
            label={t('schedule.form.objectSection.organization')}
            isValid={
              !(formik.touched.organization && formik.errors.organization)
            }
            invalidMessage={formik.errors.organization}
          >
            <CustomDropdown
              name='organization'
              disabled={isEditingMode}
              options={orgOptions}
              onChange={handleOrgChange}
              placeholder={
                formik.values.organization?.name ||
                t('schedule.form.objectSection.chooseOrganization')
              }
              onBlur={formik.handleBlur}
              emptyMessage={t('schedule.organizationsNull')}
              className={classNames(isValidClassname(formik, 'organization'))}
            />
          </FormField>
        </div>

        <div className={styles.halfSection}>
          <FormField
            label={t('schedule.form.objectSection.object')}
            isValid={
              !(formik.touched.rental_object && formik.errors.rental_object)
            }
            invalidMessage={formik.errors.rental_object}
          >
            <CustomDropdown
              name='rental_object'
              options={objectOptions}
              disabled={isEditingMode}
              placeholder={
                rental_object?.name ||
                t('schedule.form.objectSection.chooseObject')
              }
              onChange={handleObjectChange}
              emptyMessage={
                isLoading && formik.values.organization ? (
                  <Flex options={{ align: 'center' }}>
                    <ProgressSpinner />
                  </Flex>
                ) : (
                  t('schedule.objectsNull')
                )
              }
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'rental_object'))}
            />
          </FormField>
        </div>
      </Flex>

      <FormField
        label={t('schedule.form.dateAndTime')}
        isValid={!(formik.touched.date && formik.errors.date)}
        invalidMessage={formik.errors.date}
      >
        <Calendar
          name='date'
          disabled={isEditingMode}
          className={classNames(
            styles.calendar,
            isValidClassname(formik, 'date'),
          )}
          placeholder={t('schedule.form.chooseDate')}
          value={formik.values.date}
          onChange={handleDateChange}
          onShow={() => formik.setFieldTouched('date')}
          minDate={new Date()}
        />
      </FormField>

      <Flex options={{ gap: 1 }}>
        <div className={styles.halfSection}>
          <FormField
            label={t('schedule.form.timeFrom')}
            isValid={!(formik.touched.startHours && formik.errors.startHours)}
            invalidMessage={formik.errors.startHours}
          >
            <CustomDropdown
              name='startHours'
              placeholder={t('schedule.form.chooseTime')}
              disabled={formik.values.date === null || isEditingMode}
              value={formik.values.startHours}
              emptyMessage={t('schedule.organizationWorkingHoursNull')}
              options={
                isWorkingDay
                  ? generateDropdownOptions(
                      time?.start as number,
                      (time?.end as number) - 1,
                    )
                  : undefined
              }
              onChange={handleFromHoursChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'startHours'))}
            />
          </FormField>
        </div>

        <div className={styles.halfSection}>
          <FormField
            label={t('schedule.form.timeTo')}
            isValid={!(formik.touched.endHours && formik.errors.endHours)}
            invalidMessage={formik.errors.endHours}
          >
            <CustomDropdown
              name='endHours'
              disabled={formik.values.startHours === null || isEditingMode}
              options={
                formik.values.startHours !== null
                  ? generateDropdownOptions(
                      (formik.values.startHours + 1) as number,
                      time?.end as number,
                    )
                  : undefined
              }
              placeholder={t('schedule.form.chooseTime')}
              value={formik.values.endHours}
              onChange={handleToHoursChange}
              onBlur={formik.handleBlur}
              className={classNames(isValidClassname(formik, 'endHours'))}
            />
          </FormField>
        </div>
      </Flex>

      <FormField label={t('forms.price')}>
        <InputNumber
          placeholder='0.00₴'
          value={rental_object?.price_per_hour}
          size={100}
          type='text'
          mode='currency'
          currency='UAH'
          locale='uk-UA'
          disabled
        />
      </FormField>

      <FormField label={t('forms.description')}>
        <InputTextarea
          placeholder={t('forms.enterDescription')}
          autoResize
          disabled={isEditingMode}
          rows={4}
          value={description || ''}
          onChange={handleDescriptionChange}
        />
      </FormField>
    </div>
  );
};

export default ObjectReservationSection;
