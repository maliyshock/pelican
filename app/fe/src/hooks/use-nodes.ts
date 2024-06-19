import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { GameNode } from "@pelican/constants";

export function useNodes() {
  const { setNodes } = useReactFlow();

  const addNodes = useCallback(
    (nodes: GameNode[]) => {
      //TODO: we can not able to use add nodes because of ReactFlow bug
      setNodes((prevNodes: GameNode[]) => [...prevNodes, ...nodes]);
    },
    [setNodes],
  );

  // gonna be triggered on deleteElements
  const handleOnNodesDelete = useCallback((nodes: GameNode[]) => {
    // counter -
  }, []);

  return { setNodes, addNodes, handleOnNodesDelete };
}
