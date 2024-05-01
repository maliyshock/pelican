import { useCallback, useState } from "react";
import "./timer.css";
import { Line } from "~/components/timer/line.tsx";

interface TimerProps {
  time: number;
  label?: string;
  callback(): void;
}

export function Timer({ time, callback, label }: TimerProps) {
  const [key, setKey] = useState(Date.now());
  const onComplete = useCallback(() => {
    setKey(Date.now());
    callback();
  }, [callback]);

  return (
    <div className="timer">
      <div className="timer__label">{label}</div>;
      <Line key={key} duration={time} onComplete={onComplete} />
    </div>
  );
}
