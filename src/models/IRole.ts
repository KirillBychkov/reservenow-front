export interface IRoleDTO {
  name: string;
  permissions: string[];
}

export interface IRole extends IRoleDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
}
