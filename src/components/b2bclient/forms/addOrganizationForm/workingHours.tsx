import styles from './addOrganizationForm.module.scss';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import { getDayLabel } from '@/utils/formHelpers/formHelpers';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';

interface DropdownOption {
  label: string;
  value: number;
}

interface WorkingHour {
  enabled: boolean;
  dropdown1Value: number | null;
  dropdown2Value: number | null;
}

interface WorkingHoursProps {
  t: (key: string) => string;
  workingHours: WorkingHour[];
  handleAllHoursChange: (e: InputSwitchChangeEvent) => void;
  handleDaySwitchChange: (e: InputSwitchChangeEvent, index: number) => void;
  handleDropdown1Change: (e: { value: number | null }, index: number) => void;
  handleDropdown2Change: (e: { value: number | null }, index: number) => void;
  allHoursEnabled: boolean;
  dropdownOptions: DropdownOption[];
}

// non working = null null
// validation on backed: a < b
//

export const WorkingHours = ({
  t,
  workingHours,
  handleAllHoursChange,
  handleDaySwitchChange,
  handleDropdown1Change,
  handleDropdown2Change,
  allHoursEnabled,
  dropdownOptions,
}: WorkingHoursProps) => (
  <div className={styles['Form-WorkingHours']}>
    <div className={styles['WorkingHours-Row']}>
      <div className={styles['InputSwitch-Container']}>
        <h4 className='heading heading-4'>{t('organizations.workHours')}</h4>
        <div className={styles['InputSwitch-Label']}>
          <div className={styles['WorkingHours-Switch']}>
            <InputSwitch
              checked={allHoursEnabled}
              onChange={handleAllHoursChange}
              className={styles['InputSwitch']}
            />
          </div>

          <h4 className='heading heading-6'>{t('addOrganizationForm.full')}</h4>
        </div>
      </div>
    </div>
    {workingHours.map((row: any, index: number) => (
      <div key={index} className={styles['WorkingHours-Row']}>
        <div className={styles['WorkingHours-Group']}>
          <div className={styles['WorkingHours-Switch']}>
            <h4 className='heading heading-6'>
              {t(`days.${getDayLabel(index)}`)}
            </h4>
            <InputSwitch
              checked={row.enabled}
              onChange={(e) => handleDaySwitchChange(e, index)}
              className={styles['InputSwitch']}
            />
          </div>
          <div className={styles['WorkingHours-Dropdowns']}>
            <div className={styles['WorkingHours-DropdownLeft']}>
              <h6 className='heading heading-6'>
                {t('addOrganizationForm.from')}
              </h6>
              <CustomDropdown
                value={workingHours[index].dropdown1Value}
                options={dropdownOptions}
                onChange={(e) => handleDropdown1Change(e, index)}
                disabled={!row.enabled}
                placeholder={t('actions.chooseOption')}
              />
            </div>
            <div className={styles['WorkingHours-DropdownRight']}>
              <h6 className='heading heading-6'>
                {t('addOrganizationForm.to')}
              </h6>
              <CustomDropdown
                value={workingHours[index].dropdown2Value}
                options={dropdownOptions}
                onChange={(e) => handleDropdown2Change(e, index)}
                disabled={!row.enabled}
                placeholder={t('actions.chooseOption')}
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
