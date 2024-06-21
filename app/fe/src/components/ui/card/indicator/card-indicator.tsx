import { Indicator } from "~/components/ui/indicator.tsx";
import "./satiety-indicator.css";
import "./health-indicator.css";
import "./dmg-indicator.css";
import { ReactNode } from "react";

export interface IndicatorProps {
  value: number;
  max?: number;
  decor?: ReactNode;
  strokeColor?: string;
  trailColor?: string;
  type: "satiety" | "health" | "dmg";
  className?: string;
}

export function CardIndicator({ value, max, className, strokeColor = "", type, trailColor = "", decor = false }: IndicatorProps) {
  return (
    <div className={`card__value-container ${className || ""} ${type}-indicator indicator`}>
      {decor && <div className={`${type}-indicator__decor`}>{decor}</div>}

      {max ? (
        <Indicator className="card__value" percent={Math.round((value / max) * 100)} strokeColor={strokeColor} trailColor={trailColor} value={value} />
      ) : (
        <div className="card__value">{value}</div>
      )}
    </div>
  );
}
