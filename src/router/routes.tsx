import Error from "@/pages/403";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Business = lazy(() => import("@/pages/Task/Business"));
const Operation = lazy(() => import("@/pages/Task/Operation"));
const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));
const Layout = lazy(() => import("@/layout/Index"));
const Region = lazy(() => import("@/pages/Node/Region"));

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
      {
        path: "node",
        children: [{ path: "region", element: <Region /> }],
      },
      { path: "*", element: <Error /> },
    ],
  },
];

export default routes;
