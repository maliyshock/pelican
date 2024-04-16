import { GameObject, ObjectKeyName } from "~/types";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { createNode } from "~/utils/create-node.ts";
import { getRandom } from "~/utils/get-random.ts";
import { getRarity } from "~/utils/get-probability.ts";
import { getRandomFromArray } from "~/utils/get-random-from-array.ts";
import { getItemsByRarity } from "~/utils/get-items-by-rarity.ts";
import { Probability } from "~/slices/player.ts";
import { useDebounce } from "~/hooks/use-debounce.ts";

interface UseGetAction {
  node: NodeProps<GameObject>;
}

export function getRandomItem(probability: Probability, keyName: ObjectKeyName) {
  const rarity = getRarity(probability, getRandom(100))!;
  const itemsByKeyAndRarity = getItemsByRarity(rarity, keyName);
  if (itemsByKeyAndRarity === undefined) {
    // there is no such recipe message
    // TODO: this should not happen and should be covered by validation
    return undefined;
  }

  return getRandomFromArray(itemsByKeyAndRarity);
}

// by knowing source target and action we can create a function and return it
// node is target node
export function useGetAction({ node }: UseGetAction) {
  // it should be debounced
  const selectActionForNode = (nodeId: string = "") => createSelector([state => state.actions], actions => actions[nodeId]);
  const nodeSpecificAction: string | undefined = useSelector(selectActionForNode(node?.id));
  const player = useSelector((state: RootState) => state.player);
  const { addNodes } = useReactFlow();
  const debouncedNode = useDebounce(node, 200);

  return useMemo(() => {
    let timer;
    let callback;

    if (debouncedNode?.id) {
      callback = () => {
        // TODO: we need to have a fallback in case there is no items in such rarity
        const randomItem = getRandomItem(player.exploreRate, debouncedNode.data.objectKeyName);
        if (randomItem) {
          addNodes(createNode({ center: { x: debouncedNode.xPos, y: debouncedNode.yPos }, data: randomItem }));
        }
      };

      if (nodeSpecificAction === "explore") {
        timer = player.exploreSpeed;
      }

      if (nodeSpecificAction === "harvest") {
        timer = player.harvestSpeed;
      }
    }

    return {
      timer,
      callback,
      actionName: nodeSpecificAction,
    };
  }, [addNodes, debouncedNode, nodeSpecificAction, player.exploreRate, player.exploreSpeed, player.harvestSpeed]);
}
