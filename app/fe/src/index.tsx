import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./css/index.css";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>,
);
