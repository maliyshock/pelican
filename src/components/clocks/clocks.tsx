import { useEffect, useState } from "react";
import { formatTime } from "~/utils/format-tIme.ts";
import "./clocks.css";
import { Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { pause, play } from "~/slices/time.ts";
import { RootState } from "~/store";
import { Button } from "antd";

interface TimerProps {
  initHours?: number;
  initMinutes?: number;
}

// TODO: probably should be connected to the store or signals
// TODO: speed up time ?
// TODO: speed down time ?
export function Clocks({ initHours = 12, initMinutes = 45 }: TimerProps) {
  const [hours, setHours] = useState(initHours);
  const [minutes, setMinutes] = useState(initMinutes);
  const clocks = useSelector((state: RootState) => state.time);
  const dispatch = useDispatch();

  useEffect(() => {
    if (clocks.play) {
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
    }
  }, [clocks.play]);

  return (
    <div className="clocks">
      {formatTime(hours)} : {formatTime(minutes)}
      <div className="clocks__controls">
        <Button icon={<Play />} shape="round" className="clocks__button" onClick={() => dispatch(play())} />
        <Button icon={<Pause />} shape="round" className="clocks__button" onClick={() => dispatch(pause())} />
      </div>
    </div>
  );
}
