import Button from '@/components/UI/buttons/button';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import Flex from '@/components/UI/layout/flex';
import { ChevronLeft, ChevronRight, Plus } from '@blueprintjs/icons';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './toolbar.module.scss';
import { ToolbarProps } from 'react-big-calendar';
import { Events, ObjectUtils, OrganizationUtils } from '@/types/schedule';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
  orgUtils: OrganizationUtils;
  objUtils: ObjectUtils;
  currentEvent: Events;
} & ToolbarProps;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Toolbar = ({
  view,
  onView,
  onNavigate,
  views,
  label,
  objUtils,
  orgUtils,
  currentEvent,
}: Props) => {
  const viewsArray = views as Array<string>;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onObjChange, objOptions, objectName } = objUtils;
  const { orgName, onOrgChange, orgOptions } = orgUtils;
  const isLaptop = useMediaQuery('(max-width:1350px)');

  const handleNext = () => {
    onNavigate('NEXT');
  };

  const handlePrev = () => {
    onNavigate('PREV');
  };

  const handleViewChange = (e: DropdownChangeEvent) => {
    onView(e.target.value);
  };

  const ViewOptions = useMemo(() => {
    return viewsArray.slice(0, -1).map((view) => ({
      label: t(`view.${view}`),
      value: view,
    }));
  }, [t]);

  return (
    <Flex
      className={styles.toolbar}
      options={{ align: 'center', justify: 'space-between' }}
    >
      <Flex options={{ gap: 1.25, align: 'center' }}>
        <Flex options={{ gap: 1 }}>
          <div className={styles.icon} onClick={handlePrev}>
            <ChevronLeft size={20} color='#7961DB' />
          </div>
          <div className={styles.icon} onClick={handleNext}>
            <ChevronRight size={20} color='#7961DB' />
          </div>
        </Flex>
        <h4 className='heading heading-4 heading-primary'>
          {capitalize(label)}
        </h4>

        {currentEvent === Events.Organizations && (
          <Flex options={{ gap: 1 }}>
            <CustomDropdown
              placeholder={
                orgName || t('schedule.form.objectSection.chooseOrganization')
              }
              onChange={onOrgChange}
              className={styles.dropdown}
              value={orgName}
              options={orgOptions}
            />
            <CustomDropdown
              placeholder={
                objectName || t('schedule.form.objectSection.chooseObject')
              }
              className={styles.dropdown}
              options={objOptions}
              onChange={onObjChange}
            />
          </Flex>
        )}
      </Flex>

      <Flex options={{ gap: 1, align: 'center' }}>
        <CustomDropdown
          onChange={handleViewChange}
          placeholder={view}
          value={view}
          options={ViewOptions}
          className={styles.viewDropdown}
        />

        {!isLaptop && (
          <Button icon={<Plus color='white' />} onClick={() => navigate('add')}>
            {t('schedule.addReservation')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
