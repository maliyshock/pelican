import { useEffect } from "react";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import { getAveragePosition } from "~/utils/get-averahe-position.ts";
import { createNode } from "~/utils/create-node.ts";
import { destroyGroup } from "~/slices/resource-groups.ts";
import { useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { useNodes } from "./use-nodes.ts";
import { RECIPES_BOOK } from "@pelican/constants";

interface CompleteElementsPerGroup {
  [key: number]: {
    amount: number;
    ids: string[];
  };
}

export function useCraftingManager() {
  const { nodes } = useNodes();
  const dispatch = useDispatch();
  const { addNodes, deleteElements } = useReactFlow();
  const resourceGroups = useSelector((state: RootState) => state.resourceGroups);

  // groups watcher
  useEffect(() => {
    const completedElementsPerGroup = resourceGroups.complete.reduce((acc: CompleteElementsPerGroup, id) => {
      const group = resourceGroups.processing[id];

      if (acc[group] === undefined) {
        acc[group] = {
          amount: 1,
          ids: [id],
        };
      } else {
        acc[group] = {
          amount: acc[group].amount + 1,
          ids: [...acc[group].ids, id],
        };
      }

      return acc;
    }, {});

    for (let groupIndex in completedElementsPerGroup) {
      const groupElements = resourceGroups.groups[groupIndex];
      const sameLength = groupElements.length === completedElementsPerGroup[groupIndex].amount;
      const sameElements = sameLength && groupElements.filter(node => !completedElementsPerGroup[groupIndex].ids.includes(node.id)).length === 0;

      if (sameLength && sameElements) {
        const recipeKey = getRecipeKey(groupElements);
        const recipe = RECIPES_BOOK.find(recipeKey);

        if (recipe) {
          const position = getAveragePosition(nodes);
          const element = createNode({ position, data: recipe.gives });

          addNodes(element);

          dispatch(destroyGroup(Number(groupIndex)));
          deleteElements({ nodes: groupElements });
        }
      }
    }
  }, [addNodes, deleteElements, dispatch, nodes, resourceGroups.complete, resourceGroups.groups, resourceGroups.processing]);
}
