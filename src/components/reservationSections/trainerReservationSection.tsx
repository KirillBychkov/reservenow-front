import { InputNumber } from 'primereact/inputnumber';
import CustomDropdown from '../UI/dropdown/customDropdown';
import FormField from '../UI/fields/formField';
import Flex from '../UI/layout/flex';
import styles from './reservationSections.module.scss';
import { useTranslation } from 'react-i18next';
import { InputTextarea } from 'primereact/inputtextarea';
import { Cross } from '@blueprintjs/icons';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { ChangeEvent, useState } from 'react';
import {
  TrainerOption,
  TrainerReservation,
} from '@/hooks/useTrainerReservation';
import { Trainer } from '@/models/Trainer';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { generateDropdownOptions, getTimeOnCertainDay } from './helper';

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
};
 
const TrainerReservationSection = ({
  options,
  trainerReservation,
  reservationNumber,
  onDelete,
  onDataChange,
  onReservationTimeChange,
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
  const [date, setDate] = useState<Date | null>(dateOfStart);
  const [fromHours, setFromHours] = useState<number | null>(
    dateOfStart?.getHours() || null,
  );
  const [toHours, setToHours] = useState<number | null>(
    new Date(reservation_time_end as string)?.getHours() || null,
  );

  const resetHours = () => {
    setFromHours(null);
    setToHours(null);
  };

  const fullResetOfTime = () => {
    resetHours();
    setDate(null);
    onReservationTimeChange(id, { start: null, end: null });
  };

  const handleChangeTrainer = (e: DropdownChangeEvent) => {
    onDataChange(id, { trainer: e.target.value.trainer as Trainer });
    fullResetOfTime()
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange(id, { description: e.target.value });
  };

  const time =
    trainer && getTimeOnCertainDay(trainer, date?.getDay() as number);
  const isWorkingDay = time?.start !== null && time?.end !== null;

  const handleDateChange = (e: CalendarChangeEvent) => {
    setDate(e.value as Date);

    if (fromHours || toHours) {
      resetHours();
    }

    if (reservation_time_end || reservation_time_start) {
      onReservationTimeChange(id, { start: null, end: null });
    }
  };

  console.log(fromHours, toHours);
  

  const handleFromHoursChange = (e: DropdownChangeEvent) => {
    const fromHours = e.target.value as number;
    setFromHours(fromHours);

    const start = new Date(date?.setHours(fromHours) as number).toISOString();

    onReservationTimeChange(id, {
      start,
      end: fromHours >= (toHours as number) ? null : undefined,
    });
  };

  const handleToHoursChange = (e: DropdownChangeEvent) => {
    setToHours(e.target.value);

    const end = new Date(
      date?.setHours(e.target.value as number) as number,
    ).toISOString();

    onReservationTimeChange(id, { end });
  };

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.trainerSection.header', { reservationNumber })}
        </h4>
        <Cross
          className={styles.cross}
          color='#B8B8BA'
          onClick={() => onDelete(id)}
        />
      </Flex>
      <FormField label={t('schedule.form.trainerSection.trainerName')}>
        <CustomDropdown
          placeholder={
            trainer
              ? `${trainer?.first_name} ${trainer?.last_name}`
              : t('schedule.form.trainerSection.chooseTrainer')
          }
          options={options}
          onChange={handleChangeTrainer}
        />
      </FormField>

      <FormField label={t('schedule.form.dateAndTime')}>
        <Calendar
          className={styles.calendar}
          placeholder={t('schedule.form.chooseDate')}
          value={date}
          disabled={trainer === null}
          onChange={handleDateChange}
          minDate={new Date()}
        />
      </FormField>

      <Flex options={{ gap: 1 }}>
        <div style={{ flexGrow: 1 }}>
          <FormField label={t('schedule.form.timeFrom')}>
            <CustomDropdown
              disabled={date === null}
              placeholder={t('schedule.form.chooseTime')}
              value={fromHours}
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
            />
          </FormField>
        </div>

        <div style={{ flexGrow: 1 }}>
          <FormField label={t('schedule.form.timeTo')}>
            <CustomDropdown
              disabled={fromHours === null}
              options={
                fromHours !== null
                  ? generateDropdownOptions(
                      (fromHours + 1) as number,
                      time?.end as number,
                    )
                  : undefined
              }
              placeholder={t('schedule.form.chooseTime')}
              value={toHours}
              onChange={handleToHoursChange}
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
          value={description || ''}
          onChange={handleChangeDescription}
          rows={4}
        />
      </FormField>
    </div>
  );
};

export default TrainerReservationSection;
