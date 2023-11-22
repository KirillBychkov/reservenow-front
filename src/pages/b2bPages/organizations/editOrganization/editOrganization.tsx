// import React, { useContext } from 'react';
// import styles from './editOrganization.module.scss';
// import { BreadCrumb } from 'primereact/breadcrumb';
// import { Home } from '@blueprintjs/icons';
// import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
// import { useParams } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import EditOrganizationForm, {
//   IAddOrganizationInfo,
// } from '@/components/b2bclient/forms/editOrganizationForm/editOrganizationForm';
// import organizationStore from '@/store/OrganizationsStore';
// import useFetch from '@/hooks/useFetch';
// import ToastContext from '@/context/toast';
// import { IOrganization } from '@/models/IOrganization';
// const EditOrganization: React.FC = observer(() => {
//   const { t } = useTranslation();
//   const { showError } = useContext(ToastContext);
//   const { id } = useParams();

//   const {
//     data: initialValues,
//     isLoading,
//     errorMsg,
//   } = useFetch<IOrganization>(() =>
//     id
//       ? organizationStore.getOrganizationById(parseInt(id))
//       : Promise.resolve({ data: {} as IOrganization, error: '' })
//   );

//   if (errorMsg) {
//     showError(errorMsg);
//   }

//   const transformedData: IAddOrganizationInfo = {
//     name: initialValues?.name || '',
//     description: initialValues?.description || '',
//     phone: initialValues?.phone || '',
//     address: initialValues?.address || '',
//     workingHours: {
//       monday_start_hours: initialValues?.monday_start_hours || 0,
//       monday_end_hours: initialValues?.monday_end_hours || 0,
//       tuesday_start_hours: initialValues?.tuesday_start_hours || 0,
//       tuesday_end_hours: initialValues?.tuesday_end_hours || 0,
//       wednesday_start_hours: initialValues?.wednesday_start_hours || 0,
//       wednesday_end_hours: initialValues?.wednesday_end_hours || 0,
//       thursday_start_hours: initialValues?.thursday_start_hours || 0,
//       thursday_end_hours: initialValues?.thursday_end_hours || 0,
//       friday_start_hours: initialValues?.friday_start_hours || 0,
//       friday_end_hours: initialValues?.friday_end_hours || 0,
//       saturday_start_hours: initialValues?.saturday_start_hours || 0,
//       saturday_end_hours: initialValues?.saturday_end_hours || 0,
//       sunday_start_hours: initialValues?.sunday_start_hours || 0,
//       sunday_end_hours: initialValues?.sunday_end_hours || 0,
//     },
//   };

//   // [
//   //   {
//   //     enabled: initialValues?.monday_start_hours !== null,
//   //     monday_start_hours: initialValues?.monday_start_hours || 0,
//   //     monday_end_hours: initialValues?.monday_end_hours || 0,
//   //   },
//   // ];

//   // const newValue = [
//   //   'monday',
//   //   'tuesday',
//   //   'wednesday',
//   //   'thursday',
//   //   'friday',
//   //   'saturday',
//   //   'sunday',
//   // ].reduce((acc, value):any => {
//   //   const start = ${value}_start_hours;
//   //   const end = ${value}_end_hours;
//   //   const obj = {
//   //     [start]: initialValues?.[start],
//   //     [end]: initialValues[end],
//   //     enabled: initialValues[start] !== null,
//   //   };
//   //   return [...acc, obj];
//   // }, []);

//   return (
//     <div className={styles.AddOrganization}>
//       <h3 className={classNames('heading heading-3', styles.heading)}>
//         {t('organizations.edit')}
//       </h3>
//       <BreadCrumb
//         home={{ icon: <Home color='gray' />, url: '/' }}
//         model={[
//           { label: t('organizations.organizations'), url: '/organizations' },
//           {
//             label: t('organizations.edit'),
//             url: `/organizations/${id}/edit`,
//           },
//         ]}
//       />
//       <div className={styles.formContainer}>
//         {isLoading ? (
//           <ProgressSpinner />
//         ) : (
//           <EditOrganizationForm initialValues={transformedData} />
//         )}
//       </div>
//     </div>
//   );
// });

// export default EditOrganization;
