export interface RoleDTO {
  name: string;
  permissions?: string[];
}

export interface Role extends RoleDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
}
