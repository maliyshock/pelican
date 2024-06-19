import { useCallback } from "react";
import { getRandomNum } from "~/utils/get-random-num.ts";
import { createNode } from "~/utils/create-node.ts";
import { ActionKind, GameNode, GameNodeData, RESOURCE_CONTAINERS, ResourceContainer } from "@pelican/constants";
import { useNodes } from "~/hooks/use-nodes.ts";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import useStore from "~/store/use-store.ts";

interface GetActionArgs {
  targetNode: GameNode;
  actorNode?: GameNode;
  nodeSpecificAction?: ActionKind;
}

export function useGetActionCallback() {
  const { setNodes } = useNodes();
  const { setItems } = useStore(store => store.choice);
  const { setComplete } = useStore(store => store.resourceGroups);

  return useCallback(
    ({ targetNode, actorNode, nodeSpecificAction }: GetActionArgs) =>
      () => {
        let addNodes = [];

        if (actorNode && actorNode.data.profile) {
          const { profile } = actorNode.data;

          if (nodeSpecificAction === "explore") {
            const { type } = targetNode.data;
            const itemsBank = RESOURCE_CONTAINERS[type as ResourceContainer];

            if (itemsBank && itemsBank.length > 0) {
              let itemsForChoice = [] as GameNodeData[];

              for (let i = 0; i < profile.explore.options; i++) {
                const item = itemsBank[getRandomNum(itemsBank.length - 1)];

                itemsForChoice.push(item);
              }

              setItems({ items: itemsForChoice, actor: actorNode.id });
            }
          }

          if (nodeSpecificAction === "harvest") {
            const nodesBank = RESOURCE_CONTAINERS[targetNode.data.type as ResourceContainer];
            const randomItem = nodesBank?.length ? nodesBank[getRandomNum(nodesBank?.length - 1)] : undefined;

            if (randomItem) {
              const newNode = createNode({ position: { x: targetNode.position.x, y: targetNode.position.y, strict: false }, data: randomItem });

              addNodes.push(newNode);
            } else {
              console.log("there is no item");
            }
          }

          if (nodeSpecificAction === "explore" || nodeSpecificAction === "harvest") {
            // TODO: there is a conflict between setNodes and addNodes
            setNodes((prevNodes: GameNode[]) => [
              ...changeNodeValueBy({ nodes: prevNodes, ids: [targetNode.id], changes: [{ keys: ["data", "health"], value: -1 }] }),
              ...addNodes,
            ]);
          }

          if (nodeSpecificAction === "craft") {
            setComplete(targetNode.id);
          }
        }
      },
    [setComplete, setItems, setNodes],
  );
}
