import { useCallback } from "react";
import { useReactFlow } from "reactflow";

export function useDeleteEdges() {
  const { setEdges } = useReactFlow();

  return useCallback((edgeIds: string[]) => setEdges(edges => edges.filter(edg => !edgeIds.includes(edg.id))), [setEdges]);
}
