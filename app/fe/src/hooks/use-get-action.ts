import { useMemo } from "react";
import { useDebounce } from "./use-debounce.ts";
import { useGetActionCallback } from "./use-get-action-callback.ts";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "reactflow";

interface UseGetAction {
  node: GameNode;
}

// by knowing source target and action we can create a function and return it
// node is target node
export function useGetAction({ node }: UseGetAction) {
  const { getNode } = useReactFlow();
  const { items: actions } = useStore(state => state.actions);
  const actionByTarget = actions[node.id];
  const actorId = actionByTarget?.source;
  const actor = actorId ? (getNode(actorId) as GameNode) : undefined;
  const actionCallback = useGetActionCallback(); // вызов происходит часто
  const debouncedNode = useDebounce(node, 200);

  return useMemo(() => {
    let timer;
    let callback;

    if (actionByTarget) {
      if (debouncedNode.id && actor && actor.data.profile) {
        const { explore, harvest, craftingSpeed, speedPenaltyLevel } = actor.data.profile;

        callback = actionCallback({ targetNode: debouncedNode, actorNode: actor, nodeSpecificAction: actionByTarget?.actionName });

        if (actionByTarget.actionName === "explore") {
          timer = explore.speed * speedPenaltyLevel;
          // remove on target dead
        }

        if (actionByTarget.actionName === "harvest") {
          timer = harvest.speed * speedPenaltyLevel;
        }

        if (actionByTarget.actionName === "craft") {
          timer = craftingSpeed * speedPenaltyLevel;
          // remove on target dead
          // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
        }

        // talk - remove on close
      }

      return {
        actor: actionByTarget.source,
        timer: timer || 0,
        callback,
        actionName: actionByTarget.actionName,
      };
    }
  }, [actionByTarget, actionCallback, actor, debouncedNode]);
}
