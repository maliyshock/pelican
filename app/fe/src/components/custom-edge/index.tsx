import { BaseEdge, EdgeLabelRenderer, Position, getSimpleBezierPath, useReactFlow } from "@xyflow/react";
import { CircleX } from "lucide-react";

import "./custom-edge.css";
import { Actions } from "./actions.tsx";
import { useCallback, useEffect } from "react";
import { useGetActionsList } from "~/hooks/use-get-actions-list.ts";
import { Button } from "antd";
import { ActionKind } from "@pelican/constants";
import { DeliveryPoint } from "~/components/custom-edge/delivery-point.tsx";
import useStore from "~/store/use-store.ts";
import { useConnectionManager } from "~/hooks/use-connection-manager/use-connection-manager.ts";

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
  const { getEdge, deleteElements, getNode } = useReactFlow();
  const { id, sourceX, sourceY, targetX, targetY, source, target } = props;
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });
  const actionsList: ActionKind[] | undefined = useGetActionsList(source, target);
  const edge = getEdge(id);
  const handleClose = useCallback(() => edge && deleteElements({ edges: [edge] }), [deleteElements, edge]);

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
