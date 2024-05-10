import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./css/index.css";
import { ReactFlowProvider } from "reactflow";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </Provider>,
);
