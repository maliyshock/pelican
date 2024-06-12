import { useCallback, useState } from "react";
import "./timer.css";
import { Line } from "./line.tsx";
import { getRandomNum } from "~/utils/get-random-num.ts";

interface TimerProps {
  time: number;
  label?: string;
  callback(): void;
}

export function Timer({ time, callback, label }: TimerProps) {
  const [key, setKey] = useState(getRandomNum(Date.now()));
  const onComplete = useCallback(() => {
    setKey(getRandomNum(Date.now()));
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
