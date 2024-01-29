import { InputNumber } from 'primereact/inputnumber';
import CustomDropdown from '../UI/dropdown/customDropdown';
import FormField from '../UI/fields/formField';
import Flex from '../UI/layout/flex';
import styles from './reservationSections.module.scss';
import { useTranslation } from 'react-i18next';
import { InputTextarea } from 'primereact/inputtextarea';
import { Cross } from '@blueprintjs/icons';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { ChangeEvent, useEffect } from 'react';
import {
  TrainerOption,
  TrainerReservation,
} from '@/hooks/useTrainerReservation';
import { Trainer } from '@/models/Trainer';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { generateDropdownOptions, getTimeOnCertainDay } from './helper';
import * as yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
import isValidClassname from '@/utils/isValidClassname';

type Props = {
  options: TrainerOption[];
  reservationNumber: number;
  trainerReservation: TrainerReservation;
  onDelete: (id: string) => void;
  onDataChange: (
    id: string,
    data: { trainer?: Trainer; description?: string },
  ) => void;
  onReservationTimeChange: (
    id: string,
    time: { start?: string | null; end?: string | null },
  ) => void;
  isEditingMode: boolean;
  isSubmitting: boolean;
};

const TrainerReservationSection = ({
  options,
  trainerReservation,
  reservationNumber,
  onDelete,
  onDataChange,
  onReservationTimeChange,
  isEditingMode,
  isSubmitting,
}: Props) => {
  const { t } = useTranslation();
  const {
    trainer,
    id,
    reservation_time_end,
    reservation_time_start,
    description,
  } = trainerReservation;
  const dateOfStart = reservation_time_start
    ? new Date(reservation_time_start)
    : null;

  const validationSchema = yup.object({
    trainerName: yup.string().required(t('invalid.required')),
    date: yup.date().required(t('invalid.required')),
    startHours: yup.number().required(t('invalid.required')),
    endHours: yup.number().required(t('invalid.required')),
  });

  const initialValues = {
    trainerName: trainer ? `${trainer?.first_name} ${trainer?.last_name}` : '',
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

  const resetHours = async () => {
    await formik.setFieldValue('endHours', null);
    await formik.setFieldValue('startHours', null);
  };

  const fullResetOfTime = () => {
    resetHours();
    formik.setFieldValue('date', null);
    onReservationTimeChange(id, { start: null, end: null });
  };

  const handleChangeTrainer = (e: DropdownChangeEvent) => {
    const trainer = e.target.value.trainer as Trainer;
    onDataChange(id, { trainer });
    formik.setFieldValue(
      'trainerName',
      `${trainer.first_name} ${trainer.last_name}`,
    );
    fullResetOfTime();
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange(id, { description: e.target.value });
  };

  const time =
    trainer &&
    getTimeOnCertainDay(trainer, formik.values.date?.getDay() as number);
  const isWorkingDay = time?.start !== null && time?.end !== null;

  const handleDateChange = (e: CalendarChangeEvent) => {
    formik.handleChange(e);
    const { startHours, endHours } = formik.values;

    if (reservation_time_end || reservation_time_start) {
      onReservationTimeChange(id, { start: null, end: null });
    }
    if (startHours || endHours) {
      resetHours();
    }
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
      formik.values.date?.setHours(endHours as number) as number,
    ).toISOString();

    onReservationTimeChange(id, { end });
  };

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.trainerSection.header', { reservationNumber })}
        </h4>
        {!isEditingMode && (
          <Cross
            className={styles.cross}
            color='#B8B8BA'
            onClick={() => onDelete(id)}
          />
        )}
      </Flex>
      <FormField
        label={t('schedule.form.trainerSection.trainerName')}
        isValid={!(formik.touched.trainerName && formik.errors.trainerName)}
        invalidMessage={formik.errors.trainerName}
      >
        <CustomDropdown
          name='trainerName'
          disabled={isEditingMode}
          placeholder={
            formik.values.trainerName ||
            t('schedule.form.trainerSection.chooseTrainer')
          }
          value={{
            label: formik.values.trainerName,
            trainer,
          }}
          emptyMessage={t('schedule.trainersNull')}
          options={options}
          onChange={handleChangeTrainer}
          onBlur={formik.handleBlur}
          className={classNames(isValidClassname(formik, 'trainerName'))}
        />
      </FormField>

      <FormField
        label={t('schedule.form.dateAndTime')}
        isValid={!(formik.touched.date && formik.errors.date)}
        invalidMessage={formik.errors.date}
      >
        <Calendar
          name='date'
          className={classNames(
            styles.calendar,
            isValidClassname(formik, 'date'),
          )}
          placeholder={t('schedule.form.chooseDate')}
          value={formik.values.date}
          disabled={isEditingMode}
          onShow={() => formik.setFieldTouched('date')}
          onChange={handleDateChange}
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
              disabled={formik.values.date === null || isEditingMode}
              placeholder={t('schedule.form.chooseTime')}
              value={formik.values.startHours}
              emptyMessage={t('schedule.trainerWorkingHoursNull')}
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
          value={trainer?.price_per_hour}
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
          value={description || ''}
          onChange={handleChangeDescription}
          rows={4}
        />
      </FormField>
    </div>
  );
};

export default TrainerReservationSection;
