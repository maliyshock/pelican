import { useCallback } from "react";
import { Connection, Edge, addEdge, useReactFlow } from "@xyflow/react";
import { useConnectionManager } from "~/hooks/use-connection-manager/use-connection-manager.ts";
import { generateId } from "@pelican/utils";

export function useOnConnect() {
  const { setEdges } = useReactFlow();
  const manageConnection = useConnectionManager();

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        manageConnection([connection], "connect");

        return setEdges((oldEdges: Edge[]) => {
          // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
          const newConnection: Edge = {
            ...connection,
            sourceHandle: "source_0",
            targetHandle: "target_0",
            type: "custom-edge",
            id: generateId(),
          };

          // so it actually put connections as edges...🤷
          return addEdge(newConnection, oldEdges);
        });
      }
    },
    [manageConnection, setEdges],
  );
}
