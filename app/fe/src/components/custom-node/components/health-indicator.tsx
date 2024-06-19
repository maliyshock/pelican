import { Indicator } from "~/components/ui/indicator.tsx";
import "./health-indicator.css";
import { Heart } from "~/components/ui/icons/heart.tsx";

interface HealthIndicatorProps {
  value: number;
  max: number;
}

export function HealthIndicator({ value, max }: HealthIndicatorProps) {
  return (
    <div className="card__value-container health-indicator bottom-right indicator">
      <div className="health-indicator__decor">
        <Heart />
      </div>
      <Indicator className={"card__value"} percent={Math.round((value / max) * 100)} strokeColor="#FF6C6C" trailColor="#FFD2D2" value={value} />
    </div>
  );
}
