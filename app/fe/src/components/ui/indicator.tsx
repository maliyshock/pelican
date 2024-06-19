import { Progress } from "antd";

interface IndicatorProps {
  strokeColor: string;
  trailColor: string;
  percent: number;
  value: number;
  className: string;
}

export function Indicator({ strokeColor, trailColor, percent, value, className }: IndicatorProps) {
  return (
    <Progress
      className={className}
      format={() => value}
      gapDegree={20}
      percent={percent}
      size={46}
      status="normal"
      strokeColor={strokeColor}
      strokeWidth={8}
      trailColor={trailColor}
      type="dashboard"
    />
  );
}
