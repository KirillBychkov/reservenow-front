import React, { useContext } from 'react';
import styles from './manageObject.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Home } from '@blueprintjs/icons';
import { useParams } from 'react-router-dom';
import ManageObjectForm from '@/components/b2bclient/forms/manageObjectForm/manageObjectForm';
import useFetch from '@/hooks/useFetch';
import { observer } from 'mobx-react-lite';
import objectsStore from '@/store/objectsStore';
import ToastContext from '@/context/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RentalObject } from '@/models/RentalObject';

const ManageObject: React.FC = observer(() => {
  const { t } = useTranslation();
  const { showError } = useContext(ToastContext);
  const { id, objectId } = useParams();

  const {
    data: object,
    isLoading,
    errorMsg,
  } = useFetch(
    () =>
      objectId
        ? objectsStore.getRentalObject(parseInt(objectId || '0'))
        : Promise.resolve({ data: {} as RentalObject, error: '' }),
    [objectId],
  );

  if (errorMsg) {
    showError(errorMsg);
  }

  return (
    <div className={styles.addObject}>
      <h3 className={classNames('heading heading-3', styles.heading)}>
        {objectId ? t('objects.edit') : t('objects.add')}
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
            label: objectId ? `${objectId}` : t('objects.add'),
            url: objectId ? `edit` : 'add',
          },
        ]}
      />
      <div className={styles.formContainer}>
        {isLoading ? (
          <ProgressSpinner />
        ) : (
          <ManageObjectForm
            initialValues={objectId ? object ?? undefined : undefined}
          />
        )}
      </div>
    </div>
  );
});

export default ManageObject;
