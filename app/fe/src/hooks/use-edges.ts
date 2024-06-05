import { useCallback, useRef } from "react";
import { Connection, Edge, getOutgoers, updateEdge, useReactFlow } from "reactflow";
import { GameNode } from "../../../common/src/types";
import { isConnectable } from "../utils/is-connectable.ts";
import { useDeleteEdge } from "./use-delete-edge.ts";

export function useEdges() {
  const { getNode } = useReactFlow();
  const { getEdges, getNodes, setEdges } = useReactFlow();
  const nodes: GameNode[] = getNodes();
  const edges = getEdges();
  const deleteEdge = useDeleteEdge();
  const edgeUpdateSuccessful = useRef(true);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      // TODO: add validation of handles here
      // validation rules:
      // * можно соединять только то что описано как возможное для соединения
      // * как вариант, описать возможные типы соединений и проверять типы
      // * второй уровень валидации проверять тип input и output, если они указаны
      // * ну и настроить катчер чтобы мы смотрели все вышеперечисленное и выбирали подходящее
      // * описать возможное максимальное количество соединений

      // target and source should always exist during the connection
      // const target = nodes.find(node => node.id === connection.target)!;
      // const source = nodes.find(node => node.id === connection.source)!;

      if (connection.source && connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        const hasCycle = (node: GameNode, visited = new Set()) => {
          if (visited.has(node.id)) return false;
          visited.add(node.id);

          for (const outgoer of getOutgoers(node, nodes, edges)) {
            if (outgoer.id === connection.source) return true;
            if (hasCycle(outgoer, visited)) return true;
          }
        };

        if (target?.id === connection.source) return false;

        // source and target should always exist
        return !!target && !hasCycle(target) && isConnectable({ source, target, edges, connection });
      }

      return false;
    },
    [getNode, nodes, edges],
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
        deleteEdge(edge);
      }

      edgeUpdateSuccessful.current = true;
    },
    [deleteEdge],
  );

  return {
    isValidConnection,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
  };
}
