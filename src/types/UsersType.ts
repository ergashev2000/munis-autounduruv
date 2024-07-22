import { BranchsType } from "./BranchsType";

export type UsersType = {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  positionId: string;
  status: boolean;
  action: boolean;
  excel: boolean;
  userBranches: BranchsType[];
  position: string;
}