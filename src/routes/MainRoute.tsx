import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { getValueFromCookie } from "@utils/cookies";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "@components/Unauthorized";

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

const permissions = getValueFromCookie("permissions");

const privateRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <ProviderLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading main layout...</div>}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading dashboard...</div>}>
                    <Dashboard />
                  </Suspense>
                }
                permission={permissions?.dashboard}
              />
            ),
          },
          {
            path: "/credit-card",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading bank cards...</div>}>
                    <BankCards />
                  </Suspense>
                }
                permission={permissions?.cardActions}
              />
            ),
          },
          {
            path: "/employees",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading employees...</div>}>
                    <Employees />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/positions",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading positions...</div>}>
                    <Positions />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/calls",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading calls...</div>}>
                    <Calls />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/media",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading media...</div>}>
                    <AddAudioSms />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/white-list",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading white list...</div>}>
                    <WhiteList />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/branches",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading branches...</div>}>
                    <Branches />
                  </Suspense>
                }
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/customer-reports",
            element: (
              <PrivateRoute
                element={
                  <Suspense fallback={<div>Loading customer reports...</div>}>
                    <CustomerReports />
                  </Suspense>
                }
                permission={permissions?.reports}
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
