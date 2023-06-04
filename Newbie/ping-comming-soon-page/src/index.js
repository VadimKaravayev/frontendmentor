import { Provider } from "react-redux";
import { store } from "./store";
import reactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = reactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
