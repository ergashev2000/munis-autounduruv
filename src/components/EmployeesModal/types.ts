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

export type { DataType };
