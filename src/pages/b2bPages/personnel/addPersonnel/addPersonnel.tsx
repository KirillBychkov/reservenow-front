import ToastContext from '@/context/toast';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './addPersonnel.module.scss';
import classNames from 'classnames';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import { ProgressSpinner } from 'primereact/progressspinner';
import AddManagerFrorm from '@/components/b2bclient/forms/addPersonnelForm/addManagerForm';

const AddPersonnel: React.FC = () => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id } = useParams();

  // const {
  //   data: initialValues,
  //   isLoading,
  //   errorMsg,
  // } = useFetch<PlainClientInfo>(
  //   () =>
  //     id
  //       ? personnelStore.getPlainClientInfo(parseInt(id)) // if id is defined, get client info (Update mode)
  //       : Promise.resolve({ data: {} as PlainClientInfo, error: '' }), // else, return empty object (Add mode)
  //   [id]
  // );

  // if (errorMsg) {
  //   showError(errorMsg);
  // }

  return (
    <div className={styles.addPersonnel}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {t('personnel.add')}
      </h3>
      <BreadCrumb
        home={{ icon: <Home color='gray' />, url: '/' }}
        model={[
          { label: t('personnel.personnel'), url: '/personnel' },
          {
            label: t('personnel.add'),
            url: '/personnel/add',
          },
        ]}
      />
      <div className={styles.formContainer}>
        {/* {isLoading ? ( */}
        {/* <ProgressSpinner /> */}
        {/* ) : ( */}
        <AddManagerFrorm
        // initialValues={id ? initialValues ?? undefined : undefined}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default AddPersonnel;
