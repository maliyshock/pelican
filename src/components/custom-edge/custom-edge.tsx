import { BaseEdge, EdgeLabelRenderer, getSimpleBezierPath, useReactFlow } from "reactflow";
import { CircleX } from "lucide-react";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: CustomEdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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
