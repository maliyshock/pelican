import { IndicatorValue } from "~/components/ui/card/indicator-value.tsx";

import "./hp.scss";
import { HpIcon } from "~/components/ui/icons/hp.tsx";

type HpProps = {
  value: number;
  max: number;
  simple: boolean;
};

export function Hp({ value, max, simple = false }: HpProps) {
  const percent = Math.round(100 - (value / max) * 100);

  return (
    <div className="hp-indicator indicator">
      <IndicatorValue className={`${simple ? "simple" : ""} hp-indicator__value-container`} value={value} max={max} />
      <HpIcon isSimple={simple} percent={percent} />
    </div>
  );
}
