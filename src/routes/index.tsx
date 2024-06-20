import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  BankCards,
  Employees,
  Login,
  Positions,
  Calls,
} from "../pages";

import MainLayout from "../layouts/MainLayout";
import { CallsForm } from "@components/CallsModal";

const privataRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/credit-card",
        element: <BankCards />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/positions",
        element: <Positions />,
      },
      {
        path: "/calls",
        element: <Calls />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
];

const routes = createBrowserRouter([...privataRoutes]);

export default routes;
