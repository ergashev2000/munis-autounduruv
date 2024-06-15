import { createBrowserRouter } from "react-router-dom";
import { Dashboard, BankCards, Employees, Login, Positions } from "../pages";

import MainLayout from "../layouts/MainLayout";

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
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
];

const routes = createBrowserRouter([...privataRoutes]);

export default routes;
