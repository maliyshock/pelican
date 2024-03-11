import { useEffect, useState } from "react";
import { formatTime } from "../utils/format-tIme.ts";
import "./timer.css";

interface TimerProps {
  initHours?: number;
  initMinutes?: number;
}

// TODO: probably should be connected to the store or signals
// TODO: stop time
// TODO: speed up time
// TODO: speed down time
export function Timer({ initHours = 12, initMinutes = 45 }: TimerProps) {
  const [hours, setHours] = useState(initHours);
  const [minutes, setMinutes] = useState(initMinutes);

  console.log("minutes", minutes);

  useEffect(() => {
    const minutesCountdown = setInterval(
      () =>
        setMinutes(prev => {
          if (prev + 1 === 60) {
            setHours(prev => (prev + 1 === 24 ? 0 : prev + 1));
            return 0;
          }
          return prev + 1;
        }),
      1000,
    );

    return () => clearInterval(minutesCountdown);
  }, []);

  return (
    <div className="timer">
      {formatTime(hours)} : {formatTime(minutes)}
    </div>
  );
}
