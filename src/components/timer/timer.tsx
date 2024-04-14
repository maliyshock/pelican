import { useState } from "react";
import "./timer.css";
import { Line } from "~/components/timer/line.tsx";

interface TimerProps {
  time: number;
  label?: string;
  callback(): void;
}

export function Timer({ time, callback, label }: TimerProps) {
  const [key, setKey] = useState(Date.now());
  const onComplete = () => {
    setKey(Date.now());
    callback();
  };
  return (
    <div className="timer">
      <div className="timer__label">{label}</div>;
      <Line key={key} onComplete={onComplete} duration={time} />
    </div>
  );
}
