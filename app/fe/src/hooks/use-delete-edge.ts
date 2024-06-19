import { useCallback } from "react";
import { Edge, useReactFlow } from "reactflow";
import useStore from "~/store/use-store.ts";

export function useDeleteEdge() {
  const { setEdges, getNode } = useReactFlow();
  const { removeConnection } = useStore(store => store.resourceGroups);

  return useCallback(
    (edge: Edge) => {
      const source = getNode(edge.source);
      const target = getNode(edge.target);

      if (source && target && source.data.roles.includes("resource") === target.data.roles.includes("resource")) {
        removeConnection({ source, target });
      }

      setEdges(edges => edges.filter(edg => edg.id !== edge.id));
    },
    [getNode, removeConnection, setEdges],
  );
}
