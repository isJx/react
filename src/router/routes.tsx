import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
];

export default routes;
