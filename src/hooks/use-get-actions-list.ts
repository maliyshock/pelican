import { useReactFlow } from "reactflow";
import { Action, GameNode } from "~/types";
import { ACTIONS_DICTIONARY } from "~/constants/actions-dictionary.ts";
import { useMemo } from "react";

export function useGetActionsList(source: string, target: string) {
  const { getNode } = useReactFlow();
  const sourceNode = getNode(source) as GameNode;
  const targetNode = getNode(target) as GameNode;

  return useMemo(() => {
    let actions: Action[] = [];

    // TODO: this is heavy. Any other data structure or Optimisation?
    sourceNode.data.roles.forEach(actor => {
      targetNode.data.roles.forEach(target => {
        const firstPlace = ACTIONS_DICTIONARY[actor];

        if (firstPlace !== undefined) {
          const secondPlace = firstPlace[target];

          if (secondPlace !== undefined) {
            actions = [...actions, ...secondPlace];
          }
        }
      });
    });

    return actions;
  }, [sourceNode.data.roles, targetNode.data.roles]);
}
