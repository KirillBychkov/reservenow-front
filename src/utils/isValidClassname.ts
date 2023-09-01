// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidClassname = (formik: any, fieldName: string) => ({
  ['p-invalid']: formik.touched[fieldName] && formik.errors[fieldName],
});

export default isValidClassname;
