import { FormikValues, useFormik } from 'formik';

export interface CustomFormikProps<T extends FormikValues> {
  formik: ReturnType<typeof useFormik<T>>;
}
