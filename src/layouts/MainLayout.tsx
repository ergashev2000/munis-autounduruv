import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import MainAside from "@components/MainAside";
import Header from "@components/Header";

export default function MainLayout() {
  return (
    <>
      <Layout>
        <MainAside />
        <Layout>
          <Header />
          <main className="main-layout">
            <Outlet />
          </main>
        </Layout>
      </Layout>
    </>
  );
}
