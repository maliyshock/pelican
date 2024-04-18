import { useCallback, useRef } from "react";
import { Connection, Edge, getOutgoers, Node, updateEdge, useReactFlow } from "reactflow";

export function useEdges() {
  const { getEdges, getNodes, setEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();
  const edgeUpdateSuccessful = useRef(true);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      // TODO: add validation of handles here
      // output handle type of source should be === input handle type
      const target = nodes.find(node => node.id === connection.target);
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target?.id === connection.source) return false;
      return !!target && !hasCycle(target);
    },
    [nodes, edges],
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges(els => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges],
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges(eds => eds.filter(e => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges],
  );

  return {
    isValidConnection,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
  };
}
