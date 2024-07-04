import { BaseEdge, EdgeLabelRenderer, Position, getSimpleBezierPath, useReactFlow } from "reactflow";
import { CircleX } from "lucide-react";

import "./custom-edge.css";
import { Actions } from "./actions.tsx";
import { useCallback } from "react";
import { useGetActionsList } from "~/hooks/use-get-actions-list.ts";
import { Button } from "antd";
import { useDeleteEdge } from "~/hooks/use-delete-edge.ts";
import { ActionKind } from "@pelican/constants";
import { DeliveryPoint } from "~/components/custom-edge/delivery-point.tsx";

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
  const deleteEdge = useDeleteEdge();

  const actionsList: ActionKind[] | undefined = useGetActionsList(source, target);
  const edge = getEdge(id);
  const handleClose = useCallback(() => edge && deleteEdge(edge), [deleteEdge, edge]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeWidth: "4px" }} />
      {/*<DeliveryPoint path={edgePath} />*/}
      <EdgeLabelRenderer>
        <div className="edge-actions" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
          {actionsList && actionsList.length > 0 && <Actions actionsList={actionsList} source={source} target={target} />}
          <Button
            className="button"
            icon={<CircleX />}
            shape="circle"
            size="large"
            onClick={handleClose}
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
