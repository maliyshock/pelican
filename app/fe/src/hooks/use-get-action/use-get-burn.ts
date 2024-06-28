import { useCallback } from "react";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useNodes } from "~/hooks/use-nodes.ts";
import { useReactFlow } from "reactflow";

export function useGetBurn() {
  const { deleteElements } = useReactFlow();
  const { setNodes } = useNodes();
  const { deleteActions } = useStore(store => store.actions);

  return useCallback(
    (actorNode: GameNode, targetNode: GameNode) => {
      const { fuel } = actorNode.data;
      const { fire } = targetNode.data;

      deleteActions([targetNode.id]);

      if (fuel !== undefined && fire) {
        setNodes(prevNodes =>
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
