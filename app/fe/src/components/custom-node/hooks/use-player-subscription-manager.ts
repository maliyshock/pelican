import useStore from "~/store/use-store.ts";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import { GameNode, RECIPES_BOOK } from "@pelican/constants";
import { useEffect } from "react";

export function usePlayerSubscriptionManager(id: string) {
  const playerSubscription = useStore(store => store.playerSubscription.items.get(id));
  const { setActions } = useStore(store => store.actions);
  const { groups, entrancePoints, setProcessing } = useStore(store => store.resourceGroups);

  useEffect(() => {
    if (playerSubscription && entrancePoints[playerSubscription] !== undefined) {
      const index = entrancePoints[playerSubscription];
      const nodes: GameNode[] | undefined = groups[index];

      if (nodes) {
        const recipeKey = getRecipeKey(nodes);

        if (RECIPES_BOOK.find(recipeKey)) {
          const nodesToProcess = nodes.reduce((acc: { [key: string]: number }, node) => {
            acc[node.id] = index;

            return acc;
          }, {});

          setProcessing(nodesToProcess);
          setActions(nodes.map(node => ({ target: node.id, source: id, actionName: "craft" })));
        }
      }
    }
  }, [entrancePoints, groups, id, playerSubscription, setActions, setProcessing]);
}
