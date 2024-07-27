import { BranchsType } from "./BranchsType";

export type EmployeesType = {
  positionId?: string;
  id?: string;
  username: string;
  fullName: string;
  phone: string;
  status: boolean;
  position: string | null;
  action: boolean;
  excel: boolean;
  branches: BranchsType[] | string[];
  userBranches?: string[];
  password?: string;
};
