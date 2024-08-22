import { useCallback } from "react";
import { Connection, Edge, useReactFlow } from "@xyflow/react";
import { GameNode } from "@pelican/constants";
import { useManagePair } from "~/hooks/use-connection-manager/use-manage-pair.ts";

export type ActionType = "connect" | "disconnect";

export function useConnectionManager() {
  const { getNode } = useReactFlow();
  const managePair = useManagePair();

  return useCallback(
    (connections: Edge[] | Connection[], type: ActionType) => {
      connections.forEach(connection => {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        managePair({ source, target, type });
      });
    },
    [getNode, managePair],
  );
}
