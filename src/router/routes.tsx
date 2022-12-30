import Layout from "@/layout/Index";
import Error from "@/pages/403";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Business = lazy(() => import("@/pages/Task/Business"));
const Operation = lazy(() => import("@/pages/Task/Operation"));

const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      { path: "/layout", element: <Navigate to="/layout/home" /> },
      { path: "home", element: <Home /> },
      {
        path: "task",
        children: [
          { path: "business", element: <Business /> },
          { path: "operation", element: <Operation /> },
        ],
      },
      { path: "*", element: <Error /> },
    ],
  },
];

export default routes;
