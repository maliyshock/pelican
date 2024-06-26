import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import "./timer.css";
import useStore from "~/store/use-store.ts";

interface LineProps {
  duration: number;
  onComplete?(): void;
}

export function Line({ duration, onComplete }: LineProps) {
  const [scope, animate] = useAnimate();
  const [isComplete, setIsComplete] = useState(false);
  const play = useStore(state => state.play);

  useEffect(() => {
    const anDuration = duration / 1000;

    animate(scope.current, { x: "0" }, { ease: "linear", duration: anDuration });
  }, [animate, duration, scope]);

  useEffect(() => {
    const animation = scope.animations[0];

    animation.then(() => setIsComplete(true));
  }, [scope.animations]);

  useEffect(() => {
    const animation = scope.animations[0];

    play ? animation.play() : animation.pause();
  }, [animate, play, scope]);

  useEffect(() => {
    if (isComplete) {
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  return <div ref={scope} className="timer__line" />;
}
