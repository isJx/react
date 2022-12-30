import ReactDOM from "react-dom/client";
import "./index.css";

import "@arco-design/web-react/dist/css/arco.css";

import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "uno.css";
import router from "./router";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Suspense>
);
