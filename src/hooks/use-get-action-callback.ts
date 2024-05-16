import { getRandomItem } from "~/utils/get-random-item.ts";
import { createNode } from "~/utils/create-node.ts";
import { GameNode, GameNodeData } from "~/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { CRAFTING, EXPLORING, HARVESTING } from "~/constants/dictionary.ts";
import { complete } from "~/slices/resource-groups.ts";

export function useGetActionCallback(nodeId: string, nodeSpecificAction: string | undefined) {
  const { addNodes, setNodes } = useReactFlow();
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  return useCallback(
    (targetNode: NodeProps<GameNodeData>) => () => {
      // TODO: we need to have a fallback in case there is no items in such rarity
      // TODO: this is actual only for harvest and explore, it should generate different types of callbacks based on argument
      if (nodeSpecificAction === HARVESTING || nodeSpecificAction === EXPLORING) {
        const probability = nodeSpecificAction === HARVESTING ? player.harvestRate : player.exploreRate;
        const randomItem = getRandomItem(probability, targetNode.data.type);

        if (randomItem) {
          const newNode = createNode({ position: { x: targetNode.xPos, y: targetNode.yPos, strict: false }, data: randomItem });

          setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: [targetNode.id], key: "health", value: -1 }));

          addNodes(newNode);
        }
      }

      if (nodeSpecificAction === CRAFTING) {
        dispatch(complete(nodeId));
      }
    },
    [addNodes, dispatch, nodeId, nodeSpecificAction, player.exploreRate, player.harvestRate, setNodes],
  );
}
