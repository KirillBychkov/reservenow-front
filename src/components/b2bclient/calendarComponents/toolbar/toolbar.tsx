import Button from "@/components/UI/buttons/button";
import CustomDropdown from "@/components/UI/dropdown/customDropdown";
import Flex from "@/components/UI/layout/flex";
import { ChevronLeft, ChevronRight } from "@blueprintjs/icons";
import { DropdownChangeEvent } from "primereact/dropdown";
import { useMemo } from "react";
import { ToolbarProps } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from './toolbar.module.scss'

export const Toolbar = ({ view, onView, onNavigate, views, label }: ToolbarProps) => {
  const viewsArray = views as Array<string>;
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <h4 className='heading heading-4 heading-primary'>{label}</h4>
      </Flex>

      <Flex options={{ gap: 1, align: 'center' }}>
        <CustomDropdown
          onChange={handleViewChange}
          placeholder={view}
          value={view}
          options={ViewOptions}
        />
        <Button fill style={{ width: '300px' }} onClick={() => navigate('add')}>
          {t('schedule.addReservation')}
        </Button>
      </Flex>
    </Flex>
  );
};