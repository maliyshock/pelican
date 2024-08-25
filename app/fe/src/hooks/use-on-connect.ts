import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "@xyflow/react";
import { useConnectionManager } from "~/hooks/use-connection-manager/use-connection-manager.ts";

export function useOnConnect() {
  const { setEdges } = useReactFlow();
  const manageConnection = useConnectionManager();

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        manageConnection([connection], "connect");

        return setEdges(oldEdges => {
          // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
          console.log("connection", connection);
          const newConnection = { ...connection, sourceHandle: 0, targetHandle: 0, type: "custom-edge" } as Connection;

          // so it actually put connections as edges...🤷
          return addEdge(newConnection, oldEdges);
        });
      }
    },
    [manageConnection, setEdges],
  );
}
