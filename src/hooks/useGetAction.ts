import { GameObject } from "~/types";
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

interface UseGetAction {
  node?: NodeProps<GameObject>;
}

// by knowing source target and action we can create a function and return it
export function useGetAction({ node }: UseGetAction) {
  const selectActionForNode = (nodeId: string = "") => createSelector([state => state.actions], actions => actions[nodeId]);
  const nodeSpecificAction: string | undefined = useSelector(selectActionForNode(node?.id));
  const player = useSelector((state: RootState) => state.player);
  const { addNodes } = useReactFlow();
  return useMemo(() => {
    let timer;
    let callback;

    if (node?.id) {
      if (nodeSpecificAction === "explore") {
        timer = player.exploreSpeed;
        callback = () => {
          const rarity = getRarity(player.exploreRate, getRandom(100))!;
          const itemsByRegionAndRarity = getItemsByRarity(rarity, "forest")!;
          const randomItem = getRandomFromArray(itemsByRegionAndRarity);
          addNodes(createNode({ center: { x: node.xPos, y: node.yPos }, data: randomItem }));
        };
      }
    }

    return {
      timer,
      callback,
      actionName: nodeSpecificAction,
    };
  }, [node?.id, node?.xPos, node?.yPos, nodeSpecificAction, player.exploreSpeed, addNodes]);
}
