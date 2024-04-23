import { getRandomItem } from "~/utils/get-random-item.ts";
import { createNode } from "~/utils/create-node.ts";
import { GameNode, GameObject } from "~/types";
import { add } from "~/slices/nodes-counter.ts";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";

export function useGetActionCallback(nodeSpecificAction: string | undefined) {
  const { addNodes, setNodes } = useReactFlow();
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  return useCallback(
    (targetNode: NodeProps<GameObject>) => () => {
      // TODO: we need to have a fallback in case there is no items in such rarity
      // TODO: this is actual only for harvest and explore, it should generate different types of callbacks based on argument

      const probability = nodeSpecificAction === "harvest" ? player.harvestRate : player.exploreRate;
      const randomItem = getRandomItem(probability, targetNode.data.objectKeyName);

      if (randomItem) {
        const newNode = createNode({ center: { x: targetNode.xPos, y: targetNode.yPos }, data: randomItem });

        if (nodeSpecificAction === "harvest" || nodeSpecificAction === "explore") {
          setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, id: targetNode.id, key: "health", value: -1 }));
        }

        addNodes(newNode);
        dispatch(add([newNode]));
      }
    },
    [addNodes, dispatch, nodeSpecificAction, player.exploreRate, player.harvestRate, setNodes],
  );
}
