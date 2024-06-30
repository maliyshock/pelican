import { useReactFlow } from "reactflow";
import { useMemo } from "react";
import { ACTIONS_MAP, ActionKind, GameNode } from "@pelican/constants";

export function useGetActionsList(source: string, target: string) {
  const { getNode } = useReactFlow();

  return useMemo(() => {
    const sourceNode = getNode(source) as GameNode;
    const targetNode = getNode(target) as GameNode;

    const actionsSet = new Set<ActionKind>();

    for (const actor of sourceNode.data.roles) {
      for (const targetRole of targetNode.data.roles) {
        const actions = ACTIONS_MAP.get(`${actor}:${targetRole}`);

        actions?.forEach(action => actionsSet.add(action));
      }
    }

    return Array.from(actionsSet);
  }, [source, target, getNode]);
}
