export interface ClientFormData {
  first_name: string;
  last_name: string;
  phone: string;
  description: string;
  status: {
      value: string;
      label: string;
  } | undefined;
}