import { GameNode, GameNodeData } from "../../../common/src/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NodeProps, useReactFlow } from "reactflow";
import { changeNodeValueBy } from "../utils/change-node-value-by.ts";
import { CRAFTING, EXPLORING, HARVESTING } from "../../../common/src/constants/dictionary.ts";
import { complete } from "../slices/resource-groups.ts";
import { useGetProbability } from "./useGetProbability.ts";
import { RESOURCE_CONTAINERS } from "../constants/resource-sources-map.ts";
import { getRandom } from "../utils/get-random.ts";
import { RootState } from "../store";
import { setItems } from "../slices/items-to-choose.ts";

export function useGetActionCallback(nodeId: string, nodeSpecificAction: string | undefined) {
  const { addNodes, setNodes } = useReactFlow();
  const getProbability = useGetProbability();
  const dispatch = useDispatch();
  const exploringOptions = useSelector((state: RootState) => state.player.explore.options);

  return useCallback(
    (targetNode: NodeProps<GameNodeData>) => () => {
      if (nodeSpecificAction === EXPLORING) {
        const { type } = targetNode.data;
        const itemsBank = RESOURCE_CONTAINERS[type];

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

      if (nodeSpecificAction === EXPLORING || nodeSpecificAction === HARVESTING) {
        setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: [targetNode.id], key: "health", value: -1 }));
      }

      if (nodeSpecificAction === CRAFTING) {
        dispatch(complete(nodeId));
      }
    },
    [addNodes, dispatch, exploringOptions, getProbability, nodeId, nodeSpecificAction, setNodes],
  );
}
