export type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  path?: string;
};
