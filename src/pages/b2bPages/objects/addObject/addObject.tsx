import React from 'react';
import styles from './addObject.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import { useParams } from 'react-router-dom';
import AddObjectForm from '@/components/b2bclient/forms/addObjectForm/addObjectForm';
import { IObject } from '@/models/IObject';
import { WeekWorkingHours } from '@/types/weekWorkingHours';
const weekWorkingHours: WeekWorkingHours = {
  monday_start_hours: 23,
  monday_end_hours: 23,
  tuesday_start_hours: 23,
  tuesday_end_hours: 23,
  wednesday_start_hours: 23,
  wednesday_end_hours: 23,
  thursday_start_hours: 23,
  thursday_end_hours: 23,
  friday_start_hours: 23,
  friday_end_hours: 23,
  saturday_start_hours: 23,
  saturday_end_hours: 23,
  sunday_start_hours: 23,
  sunday_end_hours: 23,
};

const object: IObject = {
  id: 1,
  name: 'name',
  description: 'description',
  phone: 'phone',
  price_per_hour: 23,
  address: 'address',
  created_at: new Date(),
  updated_at: new Date(),
  ...weekWorkingHours,
};

const AddObject: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div className={styles.addObject}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {t('objects.add')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          {
            label: t('organizations.organizations'),
            url: `/organizations`,
          },
          {
            label: id,
            url: `/organizations/${id}`,
          },
          {
            label: t('objects.add'),
            url: 'add',
          },
        ]}
      />
      <div className={styles.formContainer}>
        <AddObjectForm initialValues={object} />
      </div>
    </div>
  );
};

export default AddObject;
