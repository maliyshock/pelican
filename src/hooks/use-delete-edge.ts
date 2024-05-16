import { useCallback } from "react";
import { Edge, useReactFlow } from "reactflow";
import { useDispatch } from "react-redux";
import { removeConnection } from "~/slices/resource-groups.ts";
import { RESOURCE } from "~/constants/dictionary.ts";

export function useDeleteEdge() {
  const { setEdges, getNode } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (edge: Edge) => {
      const source = getNode(edge.source);
      const target = getNode(edge.target);

      if (source && target && source.data.roles.includes(RESOURCE) === target.data.roles.includes(RESOURCE)) {
        dispatch(removeConnection({ source, target }));
      }

      setEdges(edges => edges.filter(edg => edg.id !== edge.id));
    },
    [dispatch, getNode, setEdges],
  );
}
