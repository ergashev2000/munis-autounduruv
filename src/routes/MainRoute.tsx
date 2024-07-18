import { createBrowserRouter } from "react-router-dom";
import {
  BankCards,
  Calls,
  Dashboard,
  Employees,
  Login,
  Positions,
  WhiteList,
  AddAudioSms,
  CustomerReports,
  Branchs,
} from "../pages";

import MainLayout from "../layouts/MainLayout";
import ProviderLayout from "../layouts/ProviderLayout";

import { getValueFromCookie } from "@utils/cookies";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "@components/Unauthorized";

const permissions = getValueFromCookie("permissions");

const privateRoutes = [
  {
    path: "/",
    element: <ProviderLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRoute
                element={<Dashboard />}
                permission={permissions?.dashboard}
              />
            ),
          },
          {
            path: "/credit-card",
            element: (
              <PrivateRoute
                element={<BankCards />}
                permission={permissions?.cardActions}
              />
            ),
          },
          {
            path: "/employees",
            element: (
              <PrivateRoute
                element={<Employees />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/positions",
            element: (
              <PrivateRoute
                element={<Positions />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/calls",
            element: (
              <PrivateRoute
                element={<Calls />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/media",
            element: (
              <PrivateRoute
                element={<AddAudioSms />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/white-list",
            element: (
              <PrivateRoute
                element={<WhiteList />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/branchs",
            element: (
              <PrivateRoute
                element={<Branchs />}
                permission={permissions?.settings}
              />
            ),
          },
          {
            path: "/customer-reports",
            element: (
              <PrivateRoute
                element={<CustomerReports />}
                permission={permissions?.reports}
              />
            ),
          },
        ],
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
];

const routes = createBrowserRouter(privateRoutes);

export default routes;
