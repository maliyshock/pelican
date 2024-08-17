import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./css/index.css";
import { ReactFlowProvider } from "@xyflow/react";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const root = createRoot(document.getElementById("root"));

root.render(
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
