import { useCallback, useEffect, useState } from "react";
import { formatTime } from "~/utils/format-time.ts";
import "./clocks.css";
import { Pause, Play } from "lucide-react";
import { Button } from "antd";
import useStore from "~/store/use-store.ts";

interface TimerProps {
  initHours?: number;
  initMinutes?: number;
}

// TODO: probably should be connected to the store or signals
// TODO: speed up time ?
// TODO: speed down time ?
export function Clocks({ initHours = 12, initMinutes = 45 }: TimerProps) {
  const { isOpen } = useStore(store => store.modal);
  const setPlay = useStore(store => store.setPlay);
  const play = useStore(store => store.play);
  const [hours, setHours] = useState(initHours);
  const [minutes, setMinutes] = useState(initMinutes);

  useEffect(() => {
    if (play) {
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
  }, [play]);

  useEffect(() => {
    isOpen ? setPlay(false) : setPlay(true);
  }, [isOpen, setPlay]);

  const handleClick = useCallback(() => {
    if (!play) {
      !isOpen && setPlay(true);
    } else {
      !isOpen && setPlay(false);
    }
  }, [isOpen, play, setPlay]);

  return (
    <div className="clocks">
      {formatTime(hours)} : {formatTime(minutes)}
      <div className="clocks__controls">
        <Button className="clocks__button" disabled={isOpen} icon={play ? <Pause /> : <Play />} shape="round" onClick={handleClick} />
      </div>
    </div>
  );
}
