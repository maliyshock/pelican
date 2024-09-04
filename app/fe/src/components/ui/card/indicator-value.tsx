import { usePrevious } from "~/utils/use-prev.ts";

type IndicatorValueProps = {
  className?: string;
  value: number;
};

export function IndicatorValue({ className, value }: IndicatorValueProps) {
  const { value: prevValue, time: prevTime } = usePrevious(value);
  const diff = prevValue ? value - prevValue : null;
  const timeDiff = new Date().getTime() - prevTime > 3000;

  return (
    <div className={`indicator__value-container ${className}`}>
      <div className="indicator__current-value stroke-text">{value}</div>
      {diff !== 0 && diff !== null && timeDiff && (
        <div key={`${value}_${diff}`} className={`indicator__diff ${diff > 0 ? "positive" : "negative"}`}>
          {diff}
        </div>
      )}
    </div>
  );
}
