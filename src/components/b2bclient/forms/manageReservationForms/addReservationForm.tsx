import Flex from '@/components/UI/layout/flex';
import styles from './manageReservation.module.scss';
import FormField from '@/components/UI/fields/formField';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from '@/components/UI/buttons/button';
import CustomDropdown from '@/components/UI/dropdown/customDropdown';
import { useTranslation } from 'react-i18next';
import { Plus } from '@blueprintjs/icons';

const AddReservationForm = () => {
  const { t } = useTranslation();

  return (
    <form>
      <Flex options={{ direction: 'column', gap: 1.5 }}>
        <div className={styles.formSection}>
          <h4 className='heading heading-4 heading-primary'>
            Інформація про клієнта
          </h4>
          <FormField label='Номер телефону'>
            <InputMask
              name='phone'
              mask='+38 (999) 999-9999'
              placeholder='+38 (___) ___-____'
            />
          </FormField>
          <FormField label='Ім`я'>
            <InputText placeholder='Ім`я' />
          </FormField>

          <FormField label='Прізвище'>
            <InputText placeholder='Прізвище' />
          </FormField>

          <FormField label='Опис'>
            <InputTextarea
              placeholder='Введіть тут опис організації. . .'
              autoResize
              rows={5}
            />
          </FormField>
        </div>

        <Flex options={{ direction: 'column', gap: 1 }}>
          <h4 className='heading heading-5'>Додати до замовлення:</h4>

          <Flex options={{ justify: 'space-between', gap: 1 }}>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              fill
              outlined
            >
              <h3 className='heading heading-3'>Бронювання</h3>
            </Button>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              fill
              outlined
            >
              <h3 className='heading heading-3'>Тренер</h3>
            </Button>
            <Button
              style={{ backgroundColor: '#fff' }}
              className={styles.addReservationBtn}
              icon={<Plus color='#000' />}
              fill
              outlined
            >
              <h3 className='heading heading-3'>Товар</h3>
            </Button>
          </Flex>
        </Flex>

        <div className={styles.formSection}>
          <FormField label='Спосіб оплати'>
            <CustomDropdown placeholder='Виберіть спосіб оплати' value={['Готівка', 'Карта']} opt />
          </FormField>
        </div>

        <div className={styles.formSection}>
          <FormField label='Статус'>
            <CustomDropdown value={['Обробка']} placeholder='Обробка' />
          </FormField>
        </div>

        <Flex
          className={styles.formSection}
          options={{ direction: 'column', gap: 1.25 }}
        >
          <h4 className='heading heading-4'>Загальна сума</h4>
          <h4 className='heading heading-4'>₴000.00</h4>
        </Flex>

        <Flex options={{ justify: 'flex-end', gap: 1 }}>
          <Button severity='danger' fill className={styles.btn}>
            {t('actions.clear')}
          </Button>
          <Button fill className={styles.btn}>
            {t('actions.create')}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddReservationForm;
