import { BaseEdge, EdgeLabelRenderer, getSimpleBezierPath, Position, useReactFlow } from "reactflow";
import { CircleX } from "lucide-react";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: CustomEdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeWidth: "4px" }} />
      <EdgeLabelRenderer>
        <button
          style={{
            left: 0,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            top: 0,
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={() => {
            setEdges(es => es.filter(e => e.id !== id));
          }}
        >
          <CircleX />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
