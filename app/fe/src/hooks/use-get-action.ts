import { useMemo } from "react";
import { useDebounce } from "./use-debounce.ts";
import { useGetActionCallback } from "./use-get-action-callback.ts";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { Action } from "~/slices/actions.ts";
import { useReactFlow } from "reactflow";

interface UseGetAction {
  node: GameNode;
}

// by knowing source target and action we can create a function and return it
// node is target node
export function useGetAction({ node }: UseGetAction) {
  const { getNode } = useReactFlow();
  const actions = useStore(state => state.actions);
  const actionByTarget = useMemo(() => actions[node.id], [actions, node.id]) as Action | undefined;
  const actorId = actionByTarget?.source;
  const actor = actorId ? (getNode(actorId) as GameNode) : undefined;
  const actionCallback = useGetActionCallback(); // вызов происходит часто
  const debouncedNode = useDebounce(node, 200);

  return useMemo(() => {
    let timer;
    let callback;

    if (actionByTarget) {
      if (debouncedNode.id && actor && actor.data.profile) {
        callback = actionCallback({ targetNode: debouncedNode, actorNode: actor, nodeSpecificAction: actionByTarget?.actionName });

        if (actionByTarget.actionName === "explore") {
          timer = actor.data.profile.explore.speed;
        }

        if (actionByTarget.actionName === "harvest") {
          timer = actor.data.profile.harvest.speed;
        }

        if (actionByTarget.actionName === "craft") {
          timer = actor.data.profile.craftingSpeed;
          // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
        }
      }

      return {
        actor: actionByTarget.source,
        timer,
        callback,
        actionName: actionByTarget.actionName,
      };
    }
  }, [actionByTarget, actionCallback, actor, debouncedNode]);
}
