import Layout from "@/layout/Index";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      { path: "/layout", element: <Navigate to="/layout/home" /> },
      { path: "home", element: <Home /> },
      { path: "task", children: [{ path: "business", element: <About /> }] },
    ],
  },
];

export default routes;
