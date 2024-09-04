import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { GameNode } from "@pelican/constants";

export function useNodes() {
  const { setNodes } = useReactFlow();

  // gonna be triggered on deleteElements
  const handleOnNodesDelete = useCallback((nodes: GameNode[]) => {
    // counter -
  }, []);

  return { setNodes, handleOnNodesDelete };
}
