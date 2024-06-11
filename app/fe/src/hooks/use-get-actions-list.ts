import { useReactFlow } from "reactflow";
import { useMemo } from "react";
import { ACTIONS_DICTIONARY, ActionKind, GameNode } from "@pelican/constants";

export function useGetActionsList(source: string, target: string) {
  const { getNode } = useReactFlow();
  const sourceNode = getNode(source) as GameNode;
  const targetNode = getNode(target) as GameNode;

  return useMemo(() => {
    let actions: ActionKind[] = [];

    // TODO: this is heavy. Any other data structure or Optimisation?
    sourceNode.data.roles.forEach(actor => {
      targetNode.data.roles.forEach(target => {
        const actorEntity = ACTIONS_DICTIONARY[actor];

        if (actorEntity !== undefined) {
          const action = actorEntity[target];

          if (action !== undefined) {
            actions = [...actions, ...action];
          }
        }
      });
    });

    return actions;
  }, [sourceNode.data.roles, targetNode.data.roles]);
}
