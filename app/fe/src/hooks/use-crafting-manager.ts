import { useEffect } from "react";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import { getAveragePosition } from "~/utils/get-averahe-position.ts";
import { createNode } from "~/utils/create-node.ts";
import { useReactFlow } from "@xyflow/react";
import { RECIPES_BOOK } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

interface CompleteElementsPerGroup {
  [key: number]: {
    amount: number;
    ids: string[];
  };
}

// TODO: the idea is that different nodes will have different speed for crafting depending on complexity e.t.c
// This manager tracks all of completed processes (craftings) with all nodes which had it
// it will clean up the group in the store and delete nodes
// which will trigger unlink handler, which will clear up graph nodes and groups
export function useCraftingManager() {
  // TODO: addNodes conflicts with setNodes - it is react flow bug
  const { deleteElements, setNodes, getNode } = useReactFlow();
  const { complete, processing, groups, destroyGroup } = useStore(state => state.resourceGroups);

  // groups watcher
  useEffect(() => {
    const completedElementsPerGroup = complete.reduce((acc: CompleteElementsPerGroup, id) => {
      const group = processing[id];

      acc[group] = {
        amount: acc[group] === undefined ? 1 : acc[group].amount + 1,
        ids: acc[group] === undefined ? [id] : [...acc[group].ids, id],
      };

      return acc;
    }, {});

    for (let groupIndex in completedElementsPerGroup) {
      const groupElements = groups[groupIndex];
      const sameLength = groupElements.length === completedElementsPerGroup[groupIndex].amount;
      const sameElements = sameLength && groupElements.filter(node => !completedElementsPerGroup[groupIndex].ids.includes(node.id)).length === 0;

      if (sameLength && sameElements) {
        const recipeKey = getRecipeKey(groupElements);
        const recipe = RECIPES_BOOK.find(recipeKey);

        if (recipe) {
          const position = getAveragePosition(groupElements);
          const element = createNode({ type: "node", position, data: recipe.gives });

          setNodes(prevNodes => [...prevNodes, element]);

          destroyGroup(Number(groupIndex));
          deleteElements({ nodes: groupElements });
        }
      }
    }
  }, [setNodes, complete, deleteElements, destroyGroup, groups, processing, getNode]);
}
