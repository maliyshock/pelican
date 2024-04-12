import { BaseEdge, EdgeLabelRenderer, getSimpleBezierPath, Position, useReactFlow } from "reactflow";
import { CircleX } from "lucide-react";
import { dictionary } from "~/constants/dictionary.ts";
import { Action } from "~/types";
import "./custom-edge.css";
import { Actions } from "~/components/custom-edge/actions.tsx";
import { useCallback } from "react";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
};

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, source, target }: CustomEdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });
  const { setEdges } = useReactFlow();
  const actionsList: Action[] | undefined = dictionary[source]?.[target];
  const handleClose = useCallback(() => setEdges(edges => edges.filter(edg => edg.id !== id)), [id, setEdges]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeWidth: "4px" }} />
      <EdgeLabelRenderer>
        <div className="edge-actions" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
          {actionsList && actionsList.length > 0 && <Actions actionsList={actionsList} source={source} target={target} />}
          <button className="button" onClick={handleClose}>
            <CircleX />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
