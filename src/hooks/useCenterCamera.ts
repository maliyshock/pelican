import React, { useCallback, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export type Size = {
  width?: number;
  height?: number;
};

interface UserCamera {
  ref: React.MutableRefObject<HTMLElement | null>;
}

export function useCenterCamera({ ref }: UserCamera) {
  const { setViewport } = useReactFlow();
  const screenSize = useSelector((state: RootState) => state.screenSize);

  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const nodeSize = ref.current?.getBoundingClientRect();
    if (nodeSize) {
      setSize({
        width: nodeSize?.width,
        height: nodeSize?.height,
      });
    }
  }, [ref]);

  const callback = useCallback(
    (xPos: number, yPos: number) => {
      if (size.width && size.height && screenSize.width && screenSize.height) {
        setViewport(
          {
            x: xPos - size.width / 2 + screenSize.width / 2,
            y: yPos - size.height / 2 + screenSize.height / 2,
            zoom: 1,
          },
          { duration: 800 },
        );
      }
    },
    [screenSize.height, screenSize.width, setViewport, size.height, size.width],
  );

  return size.width && size.height && screenSize.width && screenSize.height ? callback : undefined;
}
