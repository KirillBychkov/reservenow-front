export interface Manager {
  id: number;
  first_name: string;
  last_name: string;
  description: string;
  image?: string;
  hired_at: Date | string;
  resigned_at?: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}
