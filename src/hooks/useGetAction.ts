import { GameNode } from "~/types";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { useReactFlow } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";

interface UseGetAction {
  target?: string;
}

// TODO: fix the hardcode later on
function createNode(): GameNode {
  const now = new Date();
  return {
    id: `tree_${now.getTime()}`,
    data: {
      inputs: [{ id: "player_input", name: "input", type: "input" }],
      // img: { src: "/assets/pelican.jpg", alt: "pelican" },
      name: "Tree",
      health: 10,
      objectType: "resource",
      grabbable: true,
    },
    position: { x: 0, y: 0 },
    type: "node",
  };
}

// by knowing source target and action we can create a function and return it
export function useGetAction({ target }: UseGetAction) {
  const selectActionForNode = (nodeId: string = "") => createSelector([state => state.actions], actions => actions[nodeId]);
  const nodeSpecificAction: string | undefined = useSelector(selectActionForNode(target));
  const player = useSelector((state: RootState) => state.player);
  const { addNodes } = useReactFlow();
  return useMemo(() => {
    let timer;
    let callback;

    if (target) {
      if (nodeSpecificAction === "explore") {
        timer = player.exploreSpeed;
        callback = () => {
          addNodes(createNode());
        };
      }
    }

    return {
      timer,
      callback,
    };
  }, [addNodes, nodeSpecificAction, player.exploreSpeed, target]);
}
