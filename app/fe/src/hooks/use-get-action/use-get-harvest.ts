import { useCallback } from "react";
import { GameNode, RESOURCE_CONTAINERS, ResourceContainer } from "@pelican/constants";
import { getRandomNum } from "~/utils/get-random-num.ts";
import { createNode } from "~/utils/create-node.ts";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { useReactFlow } from "@xyflow/react";

export function useGetHarvest() {
  const { setNodes, addNodes, getNode } = useReactFlow();

  return useCallback(
    (targetNodeId: string) => {
      const targetNode = getNode(targetNodeId) as GameNode;
      let newNodes: GameNode[] = [];
      const nodesBank = RESOURCE_CONTAINERS[targetNode.data.type as ResourceContainer];
      const randomItem = nodesBank?.length ? nodesBank[getRandomNum(nodesBank?.length - 1)] : undefined;

      if (randomItem) {
        const newNode = createNode({ position: { x: targetNode.position.x, y: targetNode.position.y, strict: false }, data: randomItem });

        newNodes.push(newNode);
      } else {
        console.log("there is no item");
      }

      setNodes((prevNodes: GameNode[]) => changeNodeValueBy({ nodes: prevNodes, ids: [targetNode.id], changes: [{ keys: ["data", "health"], value: -1 }] }));
      addNodes(newNodes);
    },
    [addNodes, setNodes],
  );
}
