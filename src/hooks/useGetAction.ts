import { GameNode, GameObject } from "~/types";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps, useReactFlow } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { getBool } from "~/utils/getBool.ts";
import { getRandom } from "~/utils/getRandom.ts";
import { APPEARANCE_RANGE } from "~/constants/constants.tsx";

interface UseGetAction {
  node?: NodeProps<GameObject>;
}

interface CreateNode {
  center: {
    x: number;
    y: number;
  };
}

// TODO: fix the hardcode later on
function createNode({ center: { x, y } }: CreateNode): GameNode {
  const now = new Date();
  const targetX = getRandom(x + APPEARANCE_RANGE);
  const targetY = getRandom(y + APPEARANCE_RANGE);
  return {
    id: `tree_${now.getTime()}`,
    data: {
      inputs: [{ id: "player_input", name: "input", type: "input" }],
      name: "Tree",
      health: 10,
      objectType: "resource",
      grabbable: true,
    },
    position: { x: getBool() ? targetX : -targetX, y: getBool() ? targetY : -targetY },
    type: "node",
  };
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
          addNodes(createNode({ center: { x: node.xPos, y: node.yPos } }));
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
