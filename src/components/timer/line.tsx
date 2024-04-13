import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";

interface LineProps {
  duration: number;
  percentage?: number;
  elapsedTime?: number;
}

export function Line({ duration, percentage, elapsedTime }: LineProps) {
  const [scope, animate] = useAnimate();
  const lastPercentage = useRef(-100); //

  useEffect(() => {
    animate(scope.current, { x: "0%" }, { ease: "linear", duration: duration / 1000 });
  }, [animate, duration, scope]);

  useEffect(() => {
    if (percentage) {
      animate(scope.current, { x: percentage + "%" }, { duration: 0 });
    } else {
      if (elapsedTime) {
        animate(scope.current, { x: "0%" }, { ease: "linear", duration: duration / 1000 - elapsedTime / 1000 });
      }
    }
  }, [animate, duration, elapsedTime, percentage, scope]);

  useEffect(() => {
    if (percentage) {
      lastPercentage.current = percentage;
    }
  }, [percentage]);

  return <div ref={scope} style={{ transform: `translateX(${lastPercentage}%)` }} className="timer__line" />;
}
