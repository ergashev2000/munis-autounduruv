import type { GetProp, TableProps } from "antd";

type DataType = {
  id: number;
  position: string;
  users_count: number;
  settings: boolean;
  reports: boolean;
  card_binding: boolean;
  access_branchs: { name: string; key: string }[];
  created_by_user: string;
  created_at: string;
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
