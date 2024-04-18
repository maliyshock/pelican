import { GameObject } from "~/types";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { NodeProps } from "reactflow";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDebounce } from "~/hooks/use-debounce.ts";
import { useGetActionCallback } from "~/hooks/use-get-action-callback.ts";

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
  const debouncedNode = useDebounce(node, 200);
  const actionCallback = useGetActionCallback(nodeSpecificAction);

  return useMemo(() => {
    let timer;
    let callback;

    if (debouncedNode?.id) {
      callback = actionCallback(debouncedNode);

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
  }, [actionCallback, debouncedNode, nodeSpecificAction, player.exploreSpeed, player.harvestSpeed]);
}
