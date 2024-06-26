import { useEffect, useRef, useState } from "react";
import useStore from "~/store/use-store.ts";
import { getLength, getTime } from "~/components/custom-edge/utils.ts";

interface DeliveryPointProps {
  path: string;
  onEnd?(): void;
  onStart?(): void;
}

export function DeliveryPoint({ path, onEnd }: DeliveryPointProps) {
  const play = useStore(store => store.play);
  const boxRef = useRef<SVGForeignObjectElement>(null);
  const [isSet, setIsSet] = useState(false);
  const [time, setTime] = useState(getTime(getLength(path)));

  useEffect(() => {
    if (boxRef.current && path) {
      boxRef.current.style.offsetPath = `path("${path}")`;
      setIsSet(true);
    }
  }, [path, boxRef]);

  useEffect(() => {
    if (isSet) {
      const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

      newPath.setAttributeNS(null, "d", path);
      const length = newPath.getTotalLength();

      setTime(getTime(length));
    }
  }, [path, isSet]);

  return (
    <foreignObject
      ref={boxRef}
      className="box box123"
      height={50}
      style={{ animationDuration: `${time}s`, animationPlayState: play ? "running" : "paused" }}
      width={50}
      onAnimationEnd={onEnd}
      onAnimationStart={onStart}
    />
  );
}
