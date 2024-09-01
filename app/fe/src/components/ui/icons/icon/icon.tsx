import "./icon.scss";
import { ReactNode } from "react";

interface IconProps {
  value: number | string;
  icon: ReactNode;
  size?: "small" | "middle" | "big" | "fill";
  valueOnIcon?: boolean;
}
export function Icon({ icon, value, size = "small", valueOnIcon = false }: IconProps) {
  return (
    <div className={`icon ${size}`}>
      <div className="icon__container icon__container--value-on-icon">
        {icon} {valueOnIcon && <div className="icon__value">{value}</div>}
      </div>
      {!valueOnIcon && <div className="icon__value">{value}</div>}
    </div>
  );
}
