import { useTranslation } from 'react-i18next';
import styles from './reservationSections.module.scss';
import Flex from '../UI/layout/flex';
import { Cross } from '@blueprintjs/icons';
import FormField from '../UI/fields/formField';
import CustomDropdown from '../UI/dropdown/customDropdown';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Organization } from '@/models/Organization';
import {
  ObjectReservation,
  OrganizationOption,
} from '@/hooks/useObjectReservation';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { ChangeEvent, useMemo, useState } from 'react';
import objectsStore from '@/store/objectsStore';
import useFetch from '@/hooks/useFetch';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RentalObject } from '@/models/RentalObject';
import { generateDropdownOptions, getTimeOnCertainDay } from './helper';

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
};

const ObjectReservationSection = ({
  orgOptions,
  onDelete,
  reservationNumber,
  objectReservation,
  onDataChange,
  onReservationTimeChange,
}: Props) => {
  const { t } = useTranslation();
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
  const [date, setDate] = useState<Date | null>(dateOfStart);
  const [fromHours, setFromHours] = useState<number | null>(
    dateOfStart?.getHours() || null,
  );
  const [toHours, setToHours] = useState<number | null>(
    new Date(reservation_time_end as string).getHours() || null,
  );
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(rental_object?.organization || null);
  
  // Todo: remove limit and skip when getAllRentalObjects endpoint is done
  const { data: objects, isLoading } = useFetch(
    () =>
      objectsStore.getRentalObjects(
        { limit: 1000, skip: 0 },
        currentOrganization?.id,
      ),
    [currentOrganization],
    currentOrganization === null,
  );

  const time =
    rental_object &&
    getTimeOnCertainDay(rental_object, date?.getDay() as number);
  const isWorkingDay = time?.start !== null && time?.end !== null;

  const resetHours = () => {
    setFromHours(null);
    setToHours(null);
  };

  const fullResetOfTime = () => {
    resetHours();
    setDate(null);
    onReservationTimeChange(id, { start: null, end: null });
  };

  const handleDateChange = (e: CalendarChangeEvent) => {
    setDate(e.value as Date);

    if (fromHours || toHours) {
      resetHours();
    }

    if (reservation_time_end || reservation_time_start) {
      onReservationTimeChange(id, { start: null, end: null });
    }
  };

  const objectOptions = useMemo(() => {
    return objects?.map((object) => ({
      label: object.name,
      object: formatObjectIn(object),
    }));
  }, [currentOrganization, objects]);

  const handleOrgChange = (e: DropdownChangeEvent) => {
    setCurrentOrganization(e.target.value.organization as Organization);

    if (rental_object) {
      onDataChange(id, {
        rental_object: null,
      });
    }

    fullResetOfTime();
  };

  const handleObjectChange = (e: DropdownChangeEvent) => {
    onDataChange(id, {
      rental_object: e.target.value.object as RentalObject,
    });

    fullResetOfTime();
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange(id, {
      description: e.target.value,
    });
  };

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
    const toHours = e.target.value as number;
    setToHours(toHours);

    const end = new Date(date?.setHours(toHours) as number).toISOString();

    onReservationTimeChange(id, { end });
  };

  return (
    <div className={styles.formSection}>
      <Flex options={{ justify: 'space-between' }}>
        <h4 className='heading heading-4'>
          {t('schedule.form.objectSection.header', { reservationNumber })}
        </h4>
        <Cross
          className={styles.cross}
          color='#B8B8BA'
          onClick={() => onDelete(id)}
        />
      </Flex>

      <Flex options={{ gap: 1 }}>
        <div style={{ flexGrow: 1 }}>
          <FormField label={t('schedule.form.objectSection.organization')}>
            <CustomDropdown
              options={orgOptions}
              onChange={handleOrgChange}
              placeholder={
                currentOrganization?.name ||
                t('schedule.form.objectSection.chooseOrganization')
              }
            />
          </FormField>
        </div>

        <div style={{ flexGrow: 1 }}>
          <FormField label={t('schedule.form.objectSection.object')}>
            <CustomDropdown
              options={objectOptions}
              disabled={currentOrganization === null}
              placeholder={
                rental_object?.name ||
                t('schedule.form.objectSection.chooseObject')
              }
              onChange={handleObjectChange}
              emptyMessage={
                isLoading ? (
                  <Flex options={{ align: 'center' }}>
                    <ProgressSpinner />
                  </Flex>
                ) : (
                  t('schedule.organizationWorkingHoursNull')
                )
              }
            />
          </FormField>
        </div>
      </Flex>

      <FormField label={t('schedule.form.dateAndTime')}>
        <Calendar
          disabled={rental_object === null}
          className={styles.calendar}
          placeholder={t('schedule.form.chooseDate')}
          value={date}
          onChange={handleDateChange}
          minDate={new Date()}
        />
      </FormField>

      <Flex options={{ gap: 1 }}>
        <div style={{ flexGrow: 1 }}>
          <FormField label={t('schedule.form.timeFrom')}>
            <CustomDropdown
              placeholder={t('schedule.form.chooseTime')}
              disabled={date === null}
              value={fromHours}
              emptyMessage={t('schedule.workingHoursNull')}
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
          rows={4}
          value={description || ''}
          onChange={handleDescriptionChange}
        />
      </FormField>
    </div>
  );
};

export default ObjectReservationSection;
