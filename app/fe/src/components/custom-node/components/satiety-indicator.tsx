import { Indicator } from "~/components/ui/indicator.tsx";
import "./satiety-indicator.css";
import { Meat } from "~/components/ui/icons/meat.tsx";

interface SatietyIndicatorProps {
  value: number;
  max: number;
}

// TODO: copy-paste with health indicator
// TODO: trailColor & strokeColor are hardcoded
export function SatietyIndicator({ value, max }: SatietyIndicatorProps) {
  return (
    <div className="card__value-container top-left satiety-indicator indicator">
      <div className="satiety-indicator__decor">
        <Meat />
      </div>
      <Indicator className={"card__value"} percent={Math.round((value / max) * 100)} strokeColor="#BD381A" trailColor="#CB9A8F" value={value} />
    </div>
  );
}
