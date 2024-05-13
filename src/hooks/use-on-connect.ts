import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "reactflow";
import { useDispatch } from "react-redux";
import { linkPair } from "~/slices/groups/groups.ts";
import { GameNode } from "~/types";

export function useOnConnect() {
  const { setEdges, getNode } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        dispatch(linkPair({ source, target }));

        return setEdges(oldEdges => {
          // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
          connection.sourceHandle = "source-0";
          connection.targetHandle = "target-0";

          // so it actually put connections as edges...🤷
          return addEdge({ ...connection, type: "custom-edge" }, oldEdges);
        });
      }
    },
    [dispatch, getNode, setEdges],
  );
}
