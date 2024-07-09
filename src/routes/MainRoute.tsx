import { createBrowserRouter } from "react-router-dom";
import {  
  BankCards,
  Calls,
  Dashboard,
  Employees,
  Login,
  Positions,
} from "../pages";

import MainLayout from "../layouts/MainLayout";

const privataRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/actions",
        element: <BankCards />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
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
