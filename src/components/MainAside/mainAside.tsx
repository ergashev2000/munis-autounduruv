import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  CreditCardOutlined,
  UserAddOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { MenuItem } from "./types";
import Logo from "../../assets/images/logo.png";

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string
): MenuItem {
  return {
    key: String(key),
    icon,
    children,
    label,
    path,
  };
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <PieChartOutlined />, undefined, "/dashboard"),
  getItem("Amallar bajarish", "sub1", <UserOutlined />, [
    getItem(
      "Plastik kartalar",
      "2",
      <CreditCardOutlined />,
      undefined,
      "/credit-card"
    ),
  ]),
  getItem("Sozlamalar", "sub2", <SettingOutlined />, [
    getItem("Lavozimlar", "3", <SafetyOutlined />, undefined, "/positions"),
    getItem(
      "Foydalanuvchilar",
      "4",
      <UserAddOutlined />,
      undefined,
      "/employees"
    ),
  ]),
];

const MainAside: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();

  const getDefaultSelectedKey = (path: string) => {
    for (const item of items) {
      if (item.path === path) return String(item.key);
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return String(child.key);
        }
      }
    }
    return "1";
  };

  const getDefaultOpenKeys = (path: string) => {
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return [String(item.key)];
        }
      }
    }
    return [];
  };

  const defaultSelectedKey = getDefaultSelectedKey(location.pathname);

  useEffect(() => {
    const openKeys = getDefaultOpenKeys(location.pathname);
    setOpenKeys(openKeys);
  }, [location.pathname]);

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      style={{ height: "100vh", position: "sticky", top: 0 }}
    >
      <Link to={"/"}>
        <div className="main-logo">
          <img src={Logo} alt="Logo" width={50} height={50} />
        </div>
      </Link>
      <Menu
        theme="dark"
        defaultSelectedKeys={[defaultSelectedKey]}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys(keys as string[])}
      >
        {items.map(item => {
          if (item.children) {
            return (
              <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                {item.children.map(subItem => (
                  <Menu.Item key={subItem.key} icon={subItem.icon}>
                    <Link to={subItem.path || ""}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path || ""}>{item.label}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};

export default MainAside;
