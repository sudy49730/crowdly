import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state-management/store";

import "./styles/global.scss";
import "rsuite/dist/rsuite.min.css";
import 'react-notifications/lib/notifications.css';

import { App } from "./components";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
