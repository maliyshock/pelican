import { useEffect, useState } from "react";
import { formatTime } from "../../utils/format-time.ts";
import "./clocks.css";
import { Pause, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { pause, play } from "../../slices/time.ts";
import { RootState } from "../../store";
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
  const isModalOpen = useSelector((state: RootState) => state.modalStatus.isOpen);
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

  useEffect(() => {
    dispatch(isModalOpen ? pause() : play());
  }, [dispatch, isModalOpen]);

  return (
    <div className="clocks">
      {formatTime(hours)} : {formatTime(minutes)}
      <div className="clocks__controls">
        <Button className="clocks__button" disabled={isModalOpen} icon={<Play />} shape="round" onClick={() => !isModalOpen && dispatch(play())} />
        <Button className="clocks__button" disabled={isModalOpen} icon={<Pause />} shape="round" onClick={() => !isModalOpen && dispatch(pause())} />
      </div>
    </div>
  );
}
