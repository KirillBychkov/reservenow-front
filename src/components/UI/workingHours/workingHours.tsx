import { useTranslation } from 'react-i18next';
import styles from './workingHours.module.scss';
import classNames from 'classnames';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import {
  defaultDay,
  dropdownOptions,
  fullDay,
  getDayLabel,
} from '@/utils/formHelpers/formHelpers';

import FormField from '@/components/UI/fields/formField';
import { CustomFormikProps } from '@/types/formik';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import { useEffect, useState } from 'react';
import { Day, Week } from '@/types/weekWorkingHours';

interface Props<T extends { workingHours: Week }>
  extends CustomFormikProps<T> {}

export const WorkingHours = <T extends { workingHours: Week }>({
  formik,
}: Props<T>) => {
  const week = formik.values.workingHours;
  const { t } = useTranslation();

  const [is24HoursChecked, setIs24HoursChecked] = useState<boolean>(false);

  const handle24HoursChange = (e: InputSwitchChangeEvent) => {
    setIs24HoursChecked(!!e.target.value);
    const newWeek = { ...week };
    Object.values(newWeek).forEach((day) => {
      day.enabled = !!e.target.value;
      if (!e.target.value) {
        day.start = null;
        day.end = null;
        return;
      }
      day.start = fullDay.start;
      day.end = fullDay.end;
    });
    formik.setFieldValue('workingHours', newWeek);
  };

  const handleDaySwitchChange = (e: InputSwitchChangeEvent, index: number) => {
    formik.setFieldValue(
      `workingHours.${getDayLabel(index)}.enabled`,
      e.target.value,
    );
    if (!e.target.value) {
      formik.setFieldValue(`workingHours.${getDayLabel(index)}.start`, null);
      formik.setFieldValue(`workingHours.${getDayLabel(index)}.end`, null);
      return;
    }
    formik.setFieldValue(
      `workingHours.${getDayLabel(index)}.start`,
      defaultDay.start,
    );
    formik.setFieldValue(
      `workingHours.${getDayLabel(index)}.end`,
      defaultDay.end,
    );
  };

  useEffect(() => {
    Object.values(week).some(
      (day: Day) =>
        day.enabled !== is24HoursChecked ||
        day.start !== fullDay.start ||
        day.end !== fullDay.end,
    ) && setIs24HoursChecked(false);

    Object.values(week).every(
      (day: Day) =>
        day.enabled === true &&
        day.start === fullDay.start &&
        day.end === fullDay.end,
    ) && setIs24HoursChecked(true);
  }, [is24HoursChecked, week]);

  return (
    <div className={classNames(styles.section, styles['Form-WorkingHours'])}>
      <div className={styles['WorkingHours-Row']}>
        <div className={styles['InputSwitch-Container']}>
          <h4 className='heading heading-4'>{t('organizations.workHours')}</h4>
          <div className={styles['InputSwitch-Label']}>
            <div className={styles['WorkingHours-Switch']}>
              <InputSwitch
                checked={is24HoursChecked}
                onChange={handle24HoursChange}
                className={styles['InputSwitch']}
              />
            </div>

            <h4 className='heading heading-6'>
              {t('addOrganizationForm.full')}
            </h4>
          </div>
        </div>
      </div>
      {Object.values(week).map((day: Day, index: number) => (
        <div key={index} className={styles['WorkingHours-Row']}>
          <div className={styles['WorkingHours-Group']}>
            <div className={styles['WorkingHours-Switch']}>
              <FormField label={t(`dates.days.${getDayLabel(index)}`)}>
                <InputSwitch
                  name={`workingHours.${getDayLabel(index)}.enabled`}
                  checked={day.enabled}
                  onChange={(e) => handleDaySwitchChange(e, index)}
                  className={styles['InputSwitch']}
                />
              </FormField>
            </div>
            <div className={styles['WorkingHours-Dropdowns']}>
              <div className={styles['WorkingHours-DropdownLeft']}>
                <FormField label={t('addOrganizationForm.from')}>
                  <CustomDropdown
                    name={`workingHours.${getDayLabel(index)}.start`}
                    value={day.start}
                    options={dropdownOptions}
                    onChange={formik.handleChange}
                    disabled={!day.enabled}
                    placeholder={t('actions.chooseOption')}
                  />
                </FormField>
              </div>
              <div className={styles['WorkingHours-DropdownRight']}>
                <FormField label={t('addOrganizationForm.to')}>
                  <CustomDropdown
                    name={`workingHours.${getDayLabel(index)}.end`}
                    value={day.end}
                    options={dropdownOptions}
                    onChange={formik.handleChange}
                    disabled={!day.enabled}
                    placeholder={t('actions.chooseOption')}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
