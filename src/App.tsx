import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import store from "./store/store";

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}
