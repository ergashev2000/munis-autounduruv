export type PositionType = {
  id?: string | undefined;
  name: string;
  cardActions: boolean;
  dashboard: boolean;
  adminReports: boolean;
  reports: boolean;
  settings: boolean;
  createdAt?: string;
};
