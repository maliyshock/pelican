import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "reactflow";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import { includes } from "~/utils/includes.ts";
import { GameNode, RECIPES_BOOK } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

export function useOnConnect() {
  const { getNode } = useReactFlow();
  const setActions = useStore(store => store.setActions);
  const { groups, entrancePoints, linkPair, setProcessing } = useStore(store => store.resourceGroups);
  const { setEdges } = useReactFlow();

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        if (includes(source.data.roles, "resource") && includes(target.data.roles, "resource")) {
          linkPair({ source, target });
        }

        if (includes(source.data.roles, "character") && entrancePoints[target.id] !== undefined) {
          const index = entrancePoints[target.id];
          const nodes = groups[index];
          const recipeKey = getRecipeKey(nodes);

          // TODO: there are repetitions with crafting manager
          if (RECIPES_BOOK.find(recipeKey)) {
            const nodesToProcess = nodes.reduce((acc: { [key: string]: number }, node) => {
              acc[node.id] = index;

              return acc;
            }, {});

            setProcessing(nodesToProcess);
            setActions(nodes.map(node => ({ target: node.id, source: source.id, actionName: "craft" })));
          }
        }

        return setEdges(oldEdges => {
          // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
          connection.sourceHandle = "source-0";
          connection.targetHandle = "target-0";

          // so it actually put connections as edges...🤷
          return addEdge({ ...connection, type: "custom-edge" }, oldEdges);
        });
      }
    },
    [entrancePoints, getNode, groups, linkPair, setProcessing, setActions, setEdges],
  );
}
