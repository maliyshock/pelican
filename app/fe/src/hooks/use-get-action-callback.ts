import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NodeProps, useReactFlow } from "reactflow";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { complete } from "~/slices/resource-groups.ts";
// import { useGetProbability } from "./useGetProbability.ts";
import { getRandomNum } from "~/utils/get-random-num.ts";
import { RootState } from "~/store";
import { setItems } from "~/slices/items-to-choose.ts";
import { createNode } from "~/utils/create-node.ts";
import { ActionKind, GameNode, GameNodeData, RESOURCE_CONTAINERS, ResourceContainer } from "@pelican/constants";

export function useGetActionCallback(nodeId: string, nodeSpecificAction: ActionKind | undefined) {
  const { addNodes, setNodes } = useReactFlow();
  // const getProbability = useGetProbability();
  const dispatch = useDispatch();
  const exploringOptions = useSelector((state: RootState) => state.player.explore.options);

  return useCallback(
    (targetNode: NodeProps<GameNodeData>) => () => {
      if (nodeSpecificAction === "explore" || nodeSpecificAction === "harvest") {
        // TODO: there is a conflict between setNodes and addNodes
        setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: [targetNode.id], key: "health", value: -1 }));
      }

      if (nodeSpecificAction === "explore") {
        const { type } = targetNode.data;
        const itemsBank = RESOURCE_CONTAINERS[type as ResourceContainer];

        if (itemsBank && itemsBank.length > 0) {
          let itemsForChoice = [];

          for (let i = 0; i < exploringOptions; i++) {
            const item = itemsBank[getRandomNum(itemsBank.length - 1)];

            itemsForChoice.push(item);
          }

          dispatch(setItems(itemsForChoice));
        }
      }

      // TODO: we need to have a fallback in case there is no items in such rarity
      // TODO: this is actual only for harvest and explore, it should generate different types of callbacks based on argument
      if (nodeSpecificAction === "harvest") {
        const nodesBank = RESOURCE_CONTAINERS[targetNode.data.type as ResourceContainer];
        const randomItem = nodesBank?.length ? nodesBank[getRandomNum(nodesBank?.length - 1)] : undefined;

        console.log("RESOURCE_CONTAINERS", RESOURCE_CONTAINERS);
        console.log("targetNode.data.type", targetNode.data.type);
        console.log("nodes?.length", nodesBank?.length);
        console.log("randomItem", randomItem);
        console.log("---");

        if (randomItem) {
          const newNode = createNode({ position: { x: targetNode.xPos, y: targetNode.yPos, strict: false }, data: randomItem });

          console.log("newNode", newNode);
          addNodes(newNode);
        } else {
          console.log("there is no item");
        }
      }

      if (nodeSpecificAction === "craft") {
        dispatch(complete(nodeId));
      }
    },
    [addNodes, dispatch, exploringOptions, nodeId, nodeSpecificAction, setNodes],
  );
}
