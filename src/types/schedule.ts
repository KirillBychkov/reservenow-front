import { Organization } from "@/models/Organization";
import { RentalObject } from "@/models/RentalObject";
import { DropdownChangeEvent } from "primereact/dropdown";

export enum Events {
  Organizations = 'organizations',
  Trainers = 'trainers',
}

export type OrgOption = {
  label: string;
  organization: Organization;
};

export type ObjOption = {
  label: string;
  object: RentalObject;
};

export type OrganizationUtils = {
  onOrgChange: (event: DropdownChangeEvent) => void;
  orgOptions: OrgOption[] | undefined;
  orgName?: string;
};

export type ObjectUtils = {
  onObjChange: (event: DropdownChangeEvent) => void;
  objOptions: ObjOption[] | undefined;
  objectName?: string;
};