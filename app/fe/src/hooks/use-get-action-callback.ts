import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NodeProps, useReactFlow } from "reactflow";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { complete } from "~/slices/resource-groups.ts";
// import { useGetProbability } from "./useGetProbability.ts";
import { getRandom } from "~/utils/get-random.ts";
import { RootState } from "~/store";
import { setItems } from "~/slices/items-to-choose.ts";
import { ActionKind, GameNode, GameNodeData, RESOURCE_CONTAINERS, ResourceContainer } from "@pelican/constants";

export function useGetActionCallback(nodeId: string, nodeSpecificAction: ActionKind | undefined) {
  const { setNodes } = useReactFlow();
  // const getProbability = useGetProbability();
  const dispatch = useDispatch();
  const exploringOptions = useSelector((state: RootState) => state.player.explore.options);

  return useCallback(
    (targetNode: NodeProps<GameNodeData>) => () => {
      if (nodeSpecificAction === "explore") {
        const { type } = targetNode.data;
        const itemsBank = RESOURCE_CONTAINERS[type as ResourceContainer];

        if (itemsBank && itemsBank.length > 0) {
          let itemsForChoice = [];

          for (let i = 0; i < exploringOptions; i++) {
            const item = itemsBank[getRandom(itemsBank.length - 1)];

            itemsForChoice.push(item);
          }

          dispatch(setItems(itemsForChoice));
        }
      }

      // TODO: we need to have a fallback in case there is no items in such rarity
      // TODO: this is actual only for harvest and explore, it should generate different types of callbacks based on argument
      // if (nodeSpecificAction === HARVESTING) {
      //   const probability = getProbability(nodeSpecificAction);
      //
      //   // TODO: Change this
      //   const randomItem = probability && (getRandomItem(probability, targetNode.data.type) as GameNodeData);
      //
      //   if (randomItem) {
      //     const newNode = createNode({ position: { x: targetNode.xPos, y: targetNode.yPos, strict: false }, data: item });
      //
      //     addNodes(newNode);
      //   } else {
      //     console.log("there is no item");
      //   }
      // }

      if (nodeSpecificAction === "explore" || nodeSpecificAction === "harvest") {
        setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: [targetNode.id], key: "health", value: -1 }));
      }

      if (nodeSpecificAction === "craft") {
        dispatch(complete(nodeId));
      }
    },
    [dispatch, exploringOptions, nodeId, nodeSpecificAction, setNodes],
  );
}
