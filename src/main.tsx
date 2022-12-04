import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@arco-design/web-react/dist/css/arco.css";

import router from "@/router";
import { RouterProvider } from "react-router-dom";

import "uno.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
