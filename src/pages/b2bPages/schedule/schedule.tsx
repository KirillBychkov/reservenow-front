import useFetch from '@/hooks/useFetch';
import ordersStore from '@/store/ordersStore';
import { useMemo, useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Flex from '@/components/UI/layout/flex';
import styles from './schedule.module.scss';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import Button from '@/components/UI/buttons/button';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'primereact/checkbox';
import { observer } from 'mobx-react-lite';
import organizationStore from '@/store/organizationsStore';
import { formatObjectIn } from '@/utils/formatters/formatObject';
import { Organization } from '@/models/Organization';
import objectsStore from '@/store/objectsStore';
import { RentalObject } from '@/models/RentalObject';
import { Toolbar } from '@/components/b2bclient/calendarComponents/toolbar/toolbar';
import { EventTitle } from '@/components/b2bclient/calendarComponents/eventTitle/eventTitle';
import { getAllObjectReservations, getAllTrainersReservations } from './helper';

const localizer = momentLocalizer(moment);

enum Events {
  Organizations = 'organizations',
  Trainers = 'trainers',
}

const Schedule = observer(() => {
  const { t } = useTranslation();
  const [currentEventType, setCurrentEventType] = useState<Events>(
    Events.Organizations,
  );
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [currentObj, setCurrentObj] = useState<RentalObject | null>(null);
  const [event, setEvents] = useState<Event[] | null>(null);

  const { data: organizations } = useFetch(
    () => organizationStore.getOrganizations(),
    [currentEventType],
    currentEventType !== Events.Organizations,
  );

  const orgOptions = useMemo(() => {
    return organizations?.map((org) => ({
      label: org.name,
      organization: formatObjectIn(org),
    }));
  }, [organizations]);

  // Todo: Remove when getAllRentalObjects is done
  const { data: objects } = useFetch(
    () =>
      objectsStore.getRentalObjects({ limit: 1000, skip: 0 }, currentOrg?.id),
    [currentOrg],
    currentOrg === null,
  );

  const objOptions = useMemo(() => {
    return objects?.map((obj) => ({
      label: obj.name,
      object: formatObjectIn(obj),
    }));
  }, [objects]);

  // Todo: remove when getAllRentalObjectOrders is done
  useFetch(
    () =>
      ordersStore.getOrders(
        { limit: 1000, skip: 0 },
        { rentalObjectId: currentObj?.id },
      ),
    [currentObj],
    currentObj === null,
    (orders) => {
      const objectReservations = getAllObjectReservations(
        orders || [],
        currentObj?.id || 0,
      );

      const events: Event[] = objectReservations.map(
        ({
          rental_object,
          reservation_time_end,
          reservation_time_start,
          description,
        }) => {
          return {
            start: new Date(reservation_time_start as string),
            end: new Date(reservation_time_end as string),
            title: (
              <EventTitle
                title={rental_object?.name as string}
                description={description || ''}
              />
            ),
          };
        },
      );

      setEvents(events);
    },
  );

  useFetch(
    () => ordersStore.getOrders({ limit: 1000, skip: 0 }),
    [currentEventType],
    currentEventType !== Events.Trainers,
    (orders) => {
      const trainerReservations = getAllTrainersReservations(orders || []);

      const events: Event[] = trainerReservations.map(
        ({
          trainer,
          reservation_time_end,
          reservation_time_start,
          description,
        }) => {
          return {
            start: new Date(reservation_time_start as string),
            end: new Date(reservation_time_end as string),
            title: (
              <EventTitle
                title={`${trainer?.first_name} ${trainer?.last_name}` as string}
                description={description || ''}
              />
            ),
          };
        },
      );

      setEvents(events);
    },
  );

  const components = useMemo(
    () => ({
      toolbar: Toolbar,
    }),
    [],
  );

  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.body}>
      <Flex options={{ align: 'center', gap: 2 }}>
        <Flex options={{ gap: 1 }}>
          {Object.values(Events).map((event) => {
            return (
              <div key={event}>
                <Button outlined>
                  <p>{t(`schedule.events.${event}`)}</p>
                  <Checkbox
                    onChange={() => {
                      setCurrentEventType(event);
                      setCurrentObj(null);
                      setCurrentOrg(null);
                      setEvents(null);
                    }}
                    value={event}
                    checked={currentEventType === event}
                  />
                </Button>
              </div>
            );
          })}
        </Flex>
        {currentEventType === Events.Organizations && (
          <Flex options={{ gap: 1 }}>
            <CustomDropdown
              placeholder={
                currentOrg?.name ||
                t('schedule.form.objectSection.chooseObject')
              }
              onChange={(e) => {
                setCurrentOrg(e.target.value.organization);
                setCurrentObj(null);
                setEvents(null);
              }}
              className={styles.dropdown}
              options={orgOptions}
            />
            <CustomDropdown
              placeholder={
                currentObj?.name ||
                t('schedule.form.objectSection.chooseOrganization')
              }
              className={styles.dropdown}
              options={objOptions}
              onChange={(e) => setCurrentObj(e.target.value.object)}
            />
          </Flex>
        )}
      </Flex>
      <Calendar
        components={components}
        localizer={localizer}
        events={event || []}
      />
    </Flex>
  );
});

export default Schedule;
