import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  PhoneOutlined,
  PieChartOutlined,
  SettingOutlined,
  CreditCardOutlined,
  UserAddOutlined,
  SafetyOutlined,
  CopyOutlined,
  PaperClipOutlined,
  SnippetsOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu } from "antd";

import { MenuItem } from "../types/MainAside";
import Logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

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

const MainAside: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const { user, logout } = useAuth();

  const items: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />, undefined, "/dashboard"),
    user?.pages?.settings
      ? getItem("Sozlamalar", "2", <SettingOutlined />, [
          getItem(
            "Lavozimlar",
            "3",
            <SafetyOutlined />,
            undefined,
            "/positions"
          ),
          getItem(
            "Foydalanuvchilar",
            "4",
            <UserAddOutlined />,
            undefined,
            "/employees"
          ),
          getItem(
            "Qo'ng'iroqlar",
            "5",
            <PhoneOutlined rotate={90} />,
            undefined,
            "/calls"
          ),
          getItem("Oq list", "6", <CopyOutlined />, undefined, "/white-list"),
          getItem(
            "Filiallar",
            "7",
            <BranchesOutlined />,
            undefined,
            "/branches"
          ),
          getItem(
            "Media fayllar",
            "8",
            <PaperClipOutlined />,
            undefined,
            "/media"
          ),
        ])
      : undefined,
    user?.pages?.cardActions
      ? getItem("Amallar bajarish", "9", <UserOutlined />, [
          getItem(
            "Plastik kartalar",
            "10",
            <CreditCardOutlined />,
            undefined,
            "/credit-card"
          ),
        ])
      : undefined,
    user?.pages.adminReports &&
      getItem("Hisobotlar", "11", <UserOutlined />, [
        getItem(
          "Xodimlar hisoboti",
          "12",
          <SnippetsOutlined />,
          undefined,
          "/customer-reports"
        ),
      ]),
  ].filter((item): item is MenuItem => !!item);

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
      style={{ height: "100vh", position: "sticky", top: 0, zIndex: 1 }}
    >
      <Flex vertical justify="space-between" style={{ height: "100%" }}>
        <div>
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
                  <Menu.SubMenu
                    key={item.key}
                    title={item.label}
                    icon={item.icon}
                  >
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
        </div>
        <Button danger onClick={logout} type="primary" style={{margin: "20px auto"}}>
          <LogOut size={18} rotate={45} /> Chiqish
        </Button>
      </Flex>
    </Sider>
  );
};

export default MainAside;
