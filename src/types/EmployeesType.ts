import { BranchsType } from "./BranchsType";

export type EmployeesType = {
  id?: string;
  username: string;
  fullName: string;
  phone: string;
  status: boolean;
  positionId: string | null;
  action: boolean;
  excel: boolean;
  branches: BranchsType[];
  position?: string | null;
  password?: string;
};