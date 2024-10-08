import { Connection, Edge } from "@xyflow/react";
import { GameNode, Socket } from "@pelican/constants";

interface CheckHandleLimits {
  source: GameNode;
  target: GameNode;
  connection: Connection;
  edges: Edge[];
}

// lets cover 1 case when we drop connection on target
export function isBelowLimit({ target, connection, edges }: CheckHandleLimits) {
  const targetHandle = target.data.inputs?.find(inp => inp.id === connection.targetHandle);

  // if (targetHandle && targetHandle.limit !== undefined) {
  //   return edges.filter(eg => eg.targetHandle === targetHandle.id).length < targetHandle.limit;
  // }

  return true;
}
