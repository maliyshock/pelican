import { useReactFlow } from "reactflow";
import { useCallback } from "react";
import { GameNode } from "~/types";

export function useUpdateOnSplit() {
  const { setNodes } = useReactFlow();

  return useCallback(
    (nodesToUpdate: GameNode[]) => {
      if (nodesToUpdate.length > 0) {
        setNodes((nodes: GameNode[]) =>
          nodes.map(node => {
            const nodeToUpdate = nodesToUpdate.find(nd => nd.id === node.id);

            return nodeToUpdate || node;
          }),
        );
      }
    },
    [setNodes],
  );
}
