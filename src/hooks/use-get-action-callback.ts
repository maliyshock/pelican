import { getRandomItem } from "~/utils/get-random-item.ts";
import { createNode } from "~/utils/create-node.ts";
import { GameNode, GameObject } from "~/types";
import { add } from "~/slices/nodes-counter.ts";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";

export function useGetActionCallback(nodeSpecificAction: string | undefined) {
  const { addNodes, setNodes } = useReactFlow();
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  return useCallback(
    (targetNode: NodeProps<GameObject>) => () => {
      // TODO: we need to have a fallback in case there is no items in such rarity
      // TODO: this is actual only for harvest and explore, it should generate different types of callbacks based on argument
      const randomItem = getRandomItem(player.exploreRate, targetNode.data.objectKeyName);
      if (randomItem) {
        const newNode = createNode({ center: { x: targetNode.xPos, y: targetNode.yPos }, data: randomItem });

        if (nodeSpecificAction === "harvest") {
          setNodes((nodes: GameNode[]) =>
            nodes.reduce((acc, node) => {
              if (node.id === targetNode.id) {
                const resultHealth = node["data"]["health"]! - 1;
                if (resultHealth > 0) {
                  acc.push({
                    ...node,
                    data: {
                      // harvest should be only for resource deposits, they must have health
                      ...node["data"],
                      health: resultHealth,
                    },
                  });
                }
              } else {
                acc.push(node);
              }
              return acc;
            }, [] as GameNode[]),
          );
        }
        addNodes(newNode);
        dispatch(add([newNode]));
      }
    },
    [addNodes, dispatch, nodeSpecificAction, player.exploreRate, setNodes],
  );
}
