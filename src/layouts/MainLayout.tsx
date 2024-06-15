import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

import { MainAside } from "../components/MainAside";
import { Outlet } from "react-router-dom";

const { Header } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <MainAside />
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <main className="main-layout">
          <Outlet />
        </main>
      </Layout>
    </Layout>
  );
};

export default App;
