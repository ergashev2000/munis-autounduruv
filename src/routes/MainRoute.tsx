import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "@components/Unauthorized";
import { Flex, Spin } from "antd";
import { AllowedPages } from "../enums/Allows";
import RedirectBasedOnPermission from "@components/RedirectBasedOnPermission";

// Lazy loading components
const BankCards = lazy(() => import("../pages/BankCards"));
const Calls = lazy(() => import("../pages/Calls"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Employees = lazy(() => import("../pages/Employees"));
const Login = lazy(() => import("../pages/Login"));
const Positions = lazy(() => import("../pages/Positions"));
const WhiteList = lazy(() => import("../pages/WhiteList"));
const AddAudioSms = lazy(() => import("../pages/Media"));
const CustomerReports = lazy(() => import("../pages/CustomerReports"));
const Branches = lazy(() => import("../pages/Branches"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const ProviderLayout = lazy(() => import("../layouts/ProviderLayout"));

const { DASHBOARD, REPORTS, CARD_ACTIONS, SETTINGS } =
  AllowedPages;
const loading = () => {
  return (
    <Flex justify="center" align="center">
      <Spin />
    </Flex>
  );
};

const privateRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={loading()}>
        <ProviderLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={loading()}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/",
            element: <RedirectBasedOnPermission/>,
          },
          {
            path: "/dashboard",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <Dashboard />
                  </Suspense>
                }
                requiredPermission={DASHBOARD}
              />
            ),
          },
          {
            path: "/credit-card",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <BankCards />
                  </Suspense>
                }
                requiredPermission={CARD_ACTIONS}
              />
            ),
          },
          {
            path: "/employees",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <Employees />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/positions",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <Positions />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/calls",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <Calls />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/media",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <AddAudioSms />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/white-list",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <WhiteList />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/branches",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <Branches />
                  </Suspense>
                }
                requiredPermission={SETTINGS}
              />
            ),
          },
          {
            path: "/customer-reports",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={loading()}>
                    <CustomerReports />
                  </Suspense>
                }
                requiredPermission={REPORTS}
              />
            ),
          },
        ],
      },
      {
        path: "/auth/login",
        element: (
          <Suspense fallback={<div>Loading login...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/unauthorized",
        element: (
          <Suspense fallback={<div>Loading unauthorized page...</div>}>
            <Unauthorized />
          </Suspense>
        ),
      },
    ],
  },
];

const routes = createBrowserRouter(privateRoutes);

export default routes;
