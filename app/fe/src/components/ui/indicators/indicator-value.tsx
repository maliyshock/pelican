import { usePrevious } from "~/utils/use-prev.ts";
import "./indicator.css";

type IndicatorValueProps = {
  className?: string;
  value: number;
};

export function IndicatorValue({ className, value }: IndicatorValueProps) {
  const prevValue = usePrevious(value);
  const diff = prevValue ? value - prevValue : null;

  return (
    <div className={`indicator__value-container ${className}`}>
      <div className="indicator__current-value stroke-text">{value}</div>
      {diff !== 0 && diff !== null && (
        <div key={`${value}_${diff}`} className={`indicator__diff ${diff > 0 ? "positive" : "negative"}`}>
          {diff}
        </div>
      )}
    </div>
  );
}
