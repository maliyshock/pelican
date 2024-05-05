import { useCallback, useEffect, useState } from "react";
import { Edge, useReactFlow } from "reactflow";
import { useDeleteEdges } from "~/hooks/use-delete-edges.ts";

export function useDeleteNodes() {
  const { setNodes, getEdges } = useReactFlow();
  const [edgesToDelete, setEdgesToDelete] = useState<Edge[]>([]);
  const deleteEdges = useDeleteEdges();

  useEffect(() => {
    if (edgesToDelete.length > 0) {
      // we need this hat to avoid unnecessary rerenderings based on resulting useCallback dependency change
      deleteEdges(edgesToDelete.map(edg => edg.id));
      setEdgesToDelete([]);
    }
  }, [deleteEdges, edgesToDelete]);

  return useCallback(
    (ids: string[]) => {
      setNodes(nodes => nodes.filter(node => !ids.includes(node.id)));
      const result = getEdges().filter(edg => (edg.source && ids.includes(edg.source)) || (edg.target && ids.includes(edg.target)));

      setEdgesToDelete(result);
    },
    [getEdges, setNodes],
  );
}
