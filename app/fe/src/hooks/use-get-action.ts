import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDebounce } from "./use-debounce.ts";
import { useGetActionCallback } from "./use-get-action-callback.ts";
import { ActionKind, GameNodeData } from "@pelican/constants";

interface UseGetAction {
  node: NodeProps<GameNodeData>;
}

// by knowing source target and action we can create a function and return it
// node is target node
export function useGetAction({ node }: UseGetAction) {
  // it should be debounced
  const selectActionForNode = (nodeId: string = "") => createSelector([state => state.actions], actions => actions[nodeId]);
  const nodeSpecificAction: ActionKind | undefined = useSelector(selectActionForNode(node?.id));
  const player = useSelector((state: RootState) => state.player);
  const debouncedNode = useDebounce(node, 200);
  const actionCallback = useGetActionCallback(node.id, nodeSpecificAction); // вызов происходит часто

  return useMemo(() => {
    let timer;
    let callback;

    if (debouncedNode?.id) {
      callback = actionCallback(debouncedNode);

      if (nodeSpecificAction === "explore") {
        timer = player.explore.speed;
      }

      if (nodeSpecificAction === "harvest") {
        timer = player.harvest.speed;
      }

      if (nodeSpecificAction === "craft") {
        timer = player.craftingSpeed;
        // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
      }
    }

    return {
      timer,
      callback,
      actionName: nodeSpecificAction,
    };
  }, [actionCallback, debouncedNode, nodeSpecificAction, player.craftingSpeed, player.explore.speed, player.harvest.speed]);
}
