import { useReactFlow } from "reactflow";
import { Action, GameNode } from "~/types";
import { ACTIONS_DICTIONARY } from "~/constants/actions-dictionary.ts";

export function useGetActionsList(source: string, target: string) {
  const { getNode } = useReactFlow();
  const sourceNode = getNode(source) as GameNode;
  const targetNode = getNode(target) as GameNode;
  let actions: Action[] = [];

  // TODO: this is heavy. Any other data structure or Optimisation?
  sourceNode.data.objectType.forEach(actor => {
    targetNode.data.objectType.forEach(target => {
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
}
