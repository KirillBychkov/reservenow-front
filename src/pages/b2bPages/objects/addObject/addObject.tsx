import React from 'react';
import styles from './addObject.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import { useParams } from 'react-router-dom';

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
        <h1>addObject</h1>
      </div>
    </div>
  );
};

export default AddObject;
