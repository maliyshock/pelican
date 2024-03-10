import { HandleType } from "../types";
import { TriangleIcon } from "../components/triangle.tsx";

export function getShape(type: HandleType) {
  if (type === "table") {
    return <TriangleIcon />;
  }
  if (type === "") {
    return <div style={{ width: "12px", height: "12px", backgroundColor: "#1D68AC" }} />;
  }
  return <div style={{ width: "12px", height: "12px", backgroundColor: "#1D68AC" }} />;
}
