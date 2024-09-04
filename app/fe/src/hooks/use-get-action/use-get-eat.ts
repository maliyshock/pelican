import { useCallback } from "react";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "@xyflow/react";

export function useGetEat() {
  const { deleteElements, setNodes } = useReactFlow();
  const { deleteActions } = useStore(store => store.actions);

  return useCallback(
    (actorNode: GameNode, targetNode: GameNode) => {
      const { nutrition } = actorNode.data;

      deleteActions([targetNode.id]);

      if (nutrition !== undefined) {
        setNodes((prevNodes: GameNode[]) =>
          changeNodeValueBy({
            nodes: prevNodes,
            ids: [targetNode.id],
            changes: [
              { keys: ["data", "profile", "digestion", "satiety"], value: +nutrition },
              ...(actorNode.data.onConsume ? [{ keys: ["data", "statuses"], value: actorNode.data.onConsume }] : []),
            ],
          }),
        );
        deleteElements({ nodes: [actorNode] });
      }
    },
    [deleteActions, deleteElements, setNodes],
  );
}
