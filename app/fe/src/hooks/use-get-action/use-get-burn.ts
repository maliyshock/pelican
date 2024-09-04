import { useCallback } from "react";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "@xyflow/react";

export function useGetBurn() {
  const { deleteElements, setNodes } = useReactFlow();
  const { deleteActions } = useStore(store => store.actions);

  return useCallback(
    (actorNode: GameNode, targetNode: GameNode) => {
      const { fuel } = actorNode.data;
      const { fire } = targetNode.data;

      deleteActions([targetNode.id]);

      if (fuel !== undefined && fire) {
        setNodes((prevNodes: GameNode[]) =>
          changeNodeValueBy({
            nodes: prevNodes,
            ids: [targetNode.id],
            changes: [{ keys: ["data", "fire", "amount"], value: Math.min(fire.max, fire.amount + fuel) }],
          }),
        );
        deleteElements({ nodes: [actorNode] });
      }
    },
    [deleteActions, deleteElements, setNodes],
  );
}
