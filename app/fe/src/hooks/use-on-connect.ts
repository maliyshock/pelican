import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { linkPair, processing } from "../slices/resource-groups.ts";
import { GameNode } from "../../../common/src/types";
import { CHARACTER, CRAFTING, RESOURCE } from "../../../common/src/constants/dictionary.ts";
import { RootState } from "../store";
import { RECIPES_BOOK } from "../constants/recepies.ts";
import { setActions } from "../slices/actions.ts";
import { getRecipeKey } from "../utils/get-recipe-key.ts";

export function useOnConnect() {
  const { groups, entrancePoints } = useSelector((state: RootState) => state.resourceGroups);
  const { setEdges, getNode } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        if (source.data.roles.includes(RESOURCE) && target.data.roles.includes(RESOURCE)) {
          dispatch(linkPair({ source, target }));
        }

        if (source.data.roles.includes(CHARACTER) && entrancePoints[target.id] !== undefined) {
          const index = entrancePoints[target.id];
          const nodes = groups[index];
          const recipeKey = getRecipeKey(nodes);

          // TODO: there are repetitions with crafting manager
          if (RECIPES_BOOK.find(recipeKey)) {
            const nodesToProcess = nodes.reduce((acc: { [key: string]: number }, node) => {
              acc[node.id] = index;

              return acc;
            }, {});

            dispatch(processing(nodesToProcess));
            dispatch(setActions(nodes.map(node => ({ target: node.id, actionName: CRAFTING }))));
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
    [dispatch, entrancePoints, getNode, groups, setEdges],
  );
}
