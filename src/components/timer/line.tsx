import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

interface LineProps {
  duration: number;
  onComplete?(): void;
}

export function Line({ duration, onComplete }: LineProps) {
  const [scope, animate] = useAnimate();
  const clocks = useSelector((state: RootState) => state.time);
  const isMounted = useRef(true);

  useEffect(() => {
    const animation = animate(scope.current, { x: "0%" }, { ease: "linear", duration: duration / 1000 });

    animation.then(() => {
      if (isMounted.current) {
        onComplete?.();
      }
    });

    return () => {
      isMounted.current = false;
      animation.cancel();
    };
  }, [animate, scope, duration, onComplete]);

  useEffect(() => {
    const animation = scope.animations[0];

    clocks.play ? animation.play() : animation.pause();
  }, [animate, clocks.play, scope]);

  return <div ref={scope} className="timer__line" />;
}
