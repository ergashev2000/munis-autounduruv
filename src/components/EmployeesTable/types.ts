import { ColumnType } from "antd/es/table";

interface Column {
  key: string;
  fullname: string;
  phone_number: number;
  place: string;
  address: string;
  login: string;
  password: string;
  status: string;
}

type TableData = {
  key: string;
  fullName: string;
  contractId: string;
  phoneNumber: string;
  cardNumber: string;
  cardExpiryDate: string;
  filial: string;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: keyof Column;
  title: string;
  inputType: "number" | "text";
  record: Column;
}

type EditableColumnType = ColumnType<Column> & {
  editable?: boolean;
};


export type { Column, TableData, EditableCellProps, EditableColumnType };
