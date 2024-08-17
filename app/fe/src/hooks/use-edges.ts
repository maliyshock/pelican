import { useCallback, useRef } from "react";
import { Connection, Edge, getOutgoers, reconnectEdge, useReactFlow } from "@xyflow/react";
import { isConnectable } from "../utils/is-connectable.ts";
import { GameNode } from "@pelican/constants";
import { useConnectionManager } from "~/hooks/use-connection-manager/use-connection-manager.ts";

export function useEdges() {
  const { getNode, deleteElements, getEdges, getNodes, setEdges } = useReactFlow();
  const nodes = getNodes<GameNode>();
  const edges = getEdges();
  const manageConnection = useConnectionManager();

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
      console.log("is valid connection");

      if (connection.source && connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        const hasCycle = (node, visited = new Set()) => {
          if (visited.has(node.id)) return false;
          visited.add(node.id);
          const outGoers = getOutgoers(node, nodes, edges);

          for (const outGoer of outGoers) {
            if (outGoer.id === connection.source) return true;
            if (hasCycle(outGoer, visited)) return true;
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

  const onReconnectStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges(els => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges],
  );

  const onReconnectEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        deleteElements({ edges: [edge] });
      }

      edgeUpdateSuccessful.current = true;
    },
    [deleteElements],
  );

  const handleOnEdgesDelete = useCallback((edges: Edge[]) => manageConnection(edges, "disconnect"), [manageConnection]);

  return {
    isValidConnection,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    handleOnEdgesDelete,
  };
}
