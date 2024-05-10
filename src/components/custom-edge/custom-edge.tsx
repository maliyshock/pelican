import { BaseEdge, EdgeLabelRenderer, Position, getSimpleBezierPath, useReactFlow } from "reactflow";
import { CircleX } from "lucide-react";
import { Action } from "~/types";
import "./custom-edge.css";
import { Actions } from "~/components/custom-edge/actions.tsx";
import { useCallback } from "react";
import { useGetActionsList } from "~/hooks/use-get-actions-list.ts";
import { Button } from "antd";
import { useManageGroupSplitting } from "~/hooks/use-delete-edges.ts";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
};

export default function CustomEdge(props: CustomEdgeProps) {
  const { getEdge } = useReactFlow();
  const { id, sourceX, sourceY, targetX, targetY, source, target } = props;
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });
  const manageGroupSplitting = useManageGroupSplitting();
  const actionsList: Action[] | undefined = useGetActionsList(source, target);
  const edge = getEdge(id);
  const handleClose = useCallback(() => edge && manageGroupSplitting([edge]), [edge, manageGroupSplitting]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeWidth: "4px" }} />
      <EdgeLabelRenderer>
        <div className="edge-actions" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
          {actionsList && actionsList.length > 0 && <Actions actionsList={actionsList} source={source} target={target} />}
          <Button className="button" icon={<CircleX />} shape="circle" size="large" onClick={handleClose} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
