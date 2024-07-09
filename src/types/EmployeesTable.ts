import type { GetProp, TableProps } from "antd";

type DataType = {
  id: number;
  fullname: string;
  access: {
    is_enter: boolean;
    is_action: boolean;
    is_report: boolean;
    is_excel: boolean;
  };
  access_branches: {
    name: string;
    key: string;
  }[];
  login: string;
  password: string;
  birthday: string;
  created_by_user: string;
  created_at: string;
  updated_at: string;
  position: string;
};

type typeColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
};
export type { DataType, TableParams, typeColumnsType };
