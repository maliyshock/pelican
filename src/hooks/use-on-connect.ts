import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "reactflow";
import { GameNode } from "~/types";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { useSetGroup } from "~/hooks/use-set-group.ts";

export function useOnConnect() {
  const { getNode, setEdges, setNodes } = useReactFlow();
  const groupsHandler = useSetGroup();

  return useCallback(
    (connection: Connection) => {
      if (!!connection.source && !!connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;
        const { ids, groupName } = groupsHandler(source, target);

        setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids, key: "group", value: groupName }));

        return setEdges(oldEdges => {
          // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
          connection.sourceHandle = "source-0";
          connection.targetHandle = "target-0";

          // TODO: it creates connections, not the edges
          // connection has id of source and target handles and also has id of source and target nodes itself
          return addEdge({ ...connection, type: "custom-edge" }, oldEdges);
        });
      }
    },
    [getNode, groupsHandler, setEdges, setNodes],
  );
}
