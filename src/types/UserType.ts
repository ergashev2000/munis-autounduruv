export type UserType = {
  fullName: string;
  id: string;
  pages: {
    settings: boolean;
    dashboard: boolean;
    cardActions: boolean;
    adminReports: boolean;
    reports: boolean;
  };
  permissions: {
    action: boolean;
    excel: boolean;
  };
  phone: string;
  position: string | null;
  status: boolean;
  userBranches: string[];
  username: string;
};
