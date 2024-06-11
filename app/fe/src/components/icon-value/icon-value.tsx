import "./icon-value.css";
import { ReactElement } from "react";
interface IconValueProps {
  value: number;
  right?: ReactElement;
  left?: ReactElement;
}
export function IconValue({ value, right, left }: IconValueProps) {
  return (
    <div className="icon-value">
      {left}
      <div className="icon-value__value">{value}</div>
      {right}
    </div>
  );
}
