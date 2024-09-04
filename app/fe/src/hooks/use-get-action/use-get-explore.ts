import { useCallback } from "react";
import { GameNode, GameNodeData, RESOURCE_CONTAINERS, ResourceContainer } from "@pelican/constants";
import { getRandomNum } from "~/utils/get-random-num.ts";
import { createNode } from "~/utils/create-node.ts";
import { getAveragePosition } from "~/utils/get-averahe-position.ts";
import useStore from "~/store/use-store.ts";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { useReactFlow } from "@xyflow/react";

export function useGetExplore() {
  const { setNodes } = useReactFlow();
  const { setItems } = useStore(store => store.choice);

  return useCallback(
    (actorNode: GameNode, targetNode: GameNode) => {
      let addNodes: GameNode[] = [];
      const { type } = targetNode.data;
      const itemsBank = RESOURCE_CONTAINERS[type as ResourceContainer];
      const { profile } = actorNode.data;
      let itemsForChoice = [] as GameNodeData[];

      if (itemsBank && itemsBank.length > 0 && profile !== undefined) {
        for (let i = 0; i < profile.explore.options; i++) {
          const item = itemsBank[getRandomNum(itemsBank.length - 1)];

          itemsForChoice.push(item);
        }
      }

      if (itemsForChoice.length > 1) {
        setItems({ items: itemsForChoice, actor: actorNode.id });
      } else {
        const newNode = createNode({ position: { ...getAveragePosition([targetNode, actorNode]), strict: false }, data: itemsForChoice[0] });

        addNodes.push(newNode);
      }

      setNodes((prevNodes: GameNode[]) => [
        ...changeNodeValueBy({ nodes: prevNodes, ids: [targetNode.id], changes: [{ keys: ["data", "health"], value: -1 }] }),
        ...addNodes,
      ]);
    },
    [setItems, setNodes],
  );
}
