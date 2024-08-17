import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { Size } from "~/store/slices/screen-size.ts";

export function useCenterCamera() {
  const { setViewport } = useReactFlow();

  return useCallback(
    (xPos: number, yPos: number, screenSize: Size) => {
      if (screenSize.width && screenSize.height) {
        setViewport(
          {
            x: xPos + screenSize.width / 2,
            y: yPos + screenSize.height / 2,
            zoom: 1,
          },
          { duration: 800 },
        );
      }
    },
    [setViewport],
  );
}
