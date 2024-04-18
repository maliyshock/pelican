import { GameObject } from "~/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { createNode } from "~/utils/create-node.ts";
import { useDebounce } from "~/hooks/use-debounce.ts";
import { getRandomItem } from "~/utils/get-random-item.ts";
import { add } from "~/slices/nodes-counter.ts";

interface UseGetAction {
  node: NodeProps<GameObject>;
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
  const dispatch = useDispatch();

  return useMemo(() => {
    let timer;
    let callback;

    if (debouncedNode?.id) {
      callback = () => {
        // TODO: we need to have a fallback in case there is no items in such rarity
        const randomItem = getRandomItem(player.exploreRate, debouncedNode.data.objectKeyName);
        if (randomItem) {
          const newNode = createNode({ center: { x: debouncedNode.xPos, y: debouncedNode.yPos }, data: randomItem });
          addNodes(newNode);
          dispatch(add([newNode]));
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
