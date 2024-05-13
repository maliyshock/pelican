import { useCallback } from "react";
import { Edge, useReactFlow } from "reactflow";
import { useDispatch } from "react-redux";
import { removeConnection } from "~/slices/groups/groups.ts";

export function useDeleteEdge() {
  const { setEdges, getNode } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (edge: Edge) => {
      const source = getNode(edge.source);
      const target = getNode(edge.target);

      if (source && target) {
        dispatch(removeConnection({ source, target }));
      }

      setEdges(edges => edges.filter(edg => edg.id !== edge.id));
    },
    [dispatch, getNode, setEdges],
  );
}
