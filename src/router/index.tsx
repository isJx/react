import About from "@/pages/About";
import Home from "@/pages/Home";
import { createBrowserRouter, Navigate } from "react-router-dom";

export default createBrowserRouter([
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
]);
