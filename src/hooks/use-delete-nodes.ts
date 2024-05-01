import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { useDeleteEdges } from "~/hooks/use-delete-edges.ts";

export function useDeleteNodes() {
  const { setNodes, getEdges } = useReactFlow();
  const deleteEdges = useDeleteEdges();

  return useCallback(
    (ids: string[]) => {
      setNodes(nodes => nodes.filter(node => !ids.includes(node.id)));
      const edgesToDelete = getEdges().filter(edg => (edg.source && ids.includes(edg.source)) || (edg.target && ids.includes(edg.target)));

      deleteEdges(edgesToDelete.map(edg => edg.id));
    },
    [deleteEdges, getEdges, setNodes],
  );
}
