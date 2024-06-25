import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./css/index.css";
import { ReactFlowProvider } from "reactflow";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      components: {
        Progress: {
          circleTextFontSize: "18px",
        },
        Button: {
          contentFontSizeLG: 18,
        },
      },
    }}
  >
    <StyleProvider layer>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </StyleProvider>
  </ConfigProvider>,
);
