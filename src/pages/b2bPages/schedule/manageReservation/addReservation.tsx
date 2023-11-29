import Flex from '@/components/UI/layout/flex';
import styles from './manageReservation.module.scss';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import AddReservationForm from '@/components/b2bclient/forms/manageReservationForms/addReservationForm';

const AddReservation = () => {
  return (
    <Flex options={{ direction: 'column', gap: 2 }} className={styles.pageBody}>
      <Flex options={{ direction: 'column', gap: 0.625 }}>
        <h3 className='heading heading-3'>Додати бронювання</h3>
        <BreadCrumb
          home={{ icon: <Home color='gray' />, url: '/' }}
          model={[
            { label: 'Розклад', url: '/equipment' },
            {
              label: 'Додати бронювання',
              disabled: true,
            },
          ]}
        />
        <div className={styles.formContainer}>
          <AddReservationForm />
        </div>
      </Flex>
    </Flex>
  );
};

export default AddReservation;
