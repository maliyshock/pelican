import { useCallback, useState } from "react";
import "./timer.css";
import { Line } from "./line.tsx";
import { getRandomNum } from "~/utils/get-random-num.ts";

interface TimerProps {
  time: number;
  label?: string;
  className: string;
  callback(): void;
}

export function Timer({ time, callback, label, className }: TimerProps) {
  const [key, setKey] = useState(getRandomNum(Date.now()));
  const onComplete = useCallback(() => {
    // in case of immediate trigger we will not loop
    if (time !== 0) {
      setKey(getRandomNum(Date.now()));
    }

    callback();
  }, [callback, time]);

  if (callback === undefined) return;

  return (
    <div className={`${className} timer`}>
      <div className="timer__label">{label}</div>;
      <Line key={key} duration={time} onComplete={onComplete} />
    </div>
  );
}
