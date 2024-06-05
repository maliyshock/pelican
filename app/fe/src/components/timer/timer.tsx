import { useCallback, useState } from "react";
import "./timer.css";
import { Line } from "./line.tsx";
import { getRandom } from "../../utils/get-random.ts";

interface TimerProps {
  time: number;
  label?: string;
  callback(): void;
}

export function Timer({ time, callback, label }: TimerProps) {
  const [key, setKey] = useState(getRandom(Date.now()));
  const onComplete = useCallback(() => {
    setKey(getRandom(Date.now()));
    callback();
  }, [callback]);

  if (callback === undefined) return;

  return (
    <div className="timer">
      <div className="timer__label">{label}</div>;
      <Line key={key} duration={time} onComplete={onComplete} />
    </div>
  );
}
