import { CSSProperties, memo, useRef } from "react";
import { BackgroundProps, ReactFlowState, useStore } from "@xyflow/react";

const selector = (s: ReactFlowState) => ({
  transform: s.transform,
  patternId: `pattern-${s.rfId}`,
});

function BackgroundComponent({
  id,
  gap = 600,
  offset = 0,
  color = "#000", // Default color to ensure visibility
  bgColor = "#fff",
  style,
  className,
  patternClassName,
}: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  const { transform, patternId } = useStore(selector);
  const gapXY: [number, number] = Array.isArray(gap) ? gap : [gap, gap];
  const scaledGap: [number, number] = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
  const offsetXY: [number, number] = Array.isArray(offset) ? offset : [offset, offset];
  const scaledOffset: [number, number] = [offsetXY[0] * transform[2] || 1, offsetXY[1] * transform[2] || 1];
  const _patternId = `${patternId}${id ? id : ""}`;

  console.log("scaledGap[1]", scaledGap[1]);
  console.log("scaledGap[0]", scaledGap[0]);

  return (
    <svg
      ref={ref}
      className={`react-flow__background ${className}`}
      data-testid="rf__background"
      style={
        {
          "position": "absolute",
          "width": "100%",
          "height": "100%",
          "top": 0,
          "left": 0,
          "--xy-background-color-props": bgColor,
          "--xy-background-pattern-color-props": color,
          ...style,
        } as CSSProperties
      }
    >
      <pattern
        height={scaledGap[1]}
        id={_patternId}
        // patternTransform={`translate(-${scaledOffset[0]},-${scaledOffset[1]})`}
        patternUnits="userSpaceOnUse"
        width={scaledGap[0]}
        x={transform[0] % scaledGap[0]}
        y={transform[1] % scaledGap[1]}
      >
        <image
          className={patternClassName || "react-flow__background-pattern"}
          height={scaledGap[1]}
          href="./assets/bgs/grass.png"
          width={scaledGap[0]}
          x="0"
          y="0"
        />
      </pattern>

      <rect fill={`url(#${_patternId})`} height="100%" width="100%" x="0" y="0" />
    </svg>
  );
}

BackgroundComponent.displayName = "Background";

export const CustomBackground = memo(BackgroundComponent);
