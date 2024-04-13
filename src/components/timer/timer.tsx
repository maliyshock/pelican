import { useCallback, useEffect, useRef, useState } from "react";
import "./timer.css";
import { Line } from "~/components/timer/line.tsx";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

interface TimerProps {
  time: number;
  callback(): void;
}

function getProgress(elapsedTime: number, time: number) {
  return (elapsedTime / time) * 100;
}

// counts time separately from the view
// makes synchronisation ot pause or on timer expiration
export function Timer({ time, callback }: TimerProps) {
  const [key, setKey] = useState(Date.now());
  const [timeProgress, setTimeProgress] = useState<number | null>(null);
  const clocks = useSelector((state: RootState) => state.time);
  const [init, setInit] = useState(clocks.play);
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const newProgress = useRef<number>(0);

  // force remount
  const updateKey = () => {
    setKey(Date.now());
  };

  const updateProgress = useCallback(() => {
    if (startTimeRef.current !== null) {
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
      newProgress.current = getProgress(elapsedTimeRef.current, time);
      if (elapsedTimeRef.current >= time) {
        callback();
        updateKey();
        elapsedTimeRef.current = 0;
        startTimeRef.current = Date.now();
      }
      requestRef.current = requestAnimationFrame(updateProgress);
    }
  }, [callback, time]);

  const pauseTimer = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }

    if (startTimeRef.current !== null) {
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
      newProgress.current = getProgress(elapsedTimeRef.current, time);
      setTimeProgress(-(100 - Math.round(newProgress.current)));
    }
  }, [time]);

  const startTimer = useCallback(() => {
    setTimeProgress(null);
    startTimeRef.current = Date.now() - elapsedTimeRef.current;
    requestRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    // we need initialization in case there the time is paused in the beginning
    clocks.play ? (startTimer(), setInit(true)) : pauseTimer();
  }, [clocks.play, pauseTimer, startTimer]);

  return <div className="timer">{init && <Line key={key} duration={time} elapsedTime={elapsedTimeRef.current} percentage={timeProgress || undefined} />}</div>;
}
