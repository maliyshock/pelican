import { useCallback } from "react";
import { Connection, Edge, useReactFlow } from "@xyflow/react";
import { GameNode, RECIPES_BOOK } from "@pelican/constants";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import useStore from "~/store/use-store.ts";
import { useManagePair } from "~/hooks/use-connection-manager/use-manage-pair.ts";

export type ActionType = "connect" | "disconnect";

export function useConnectionManager() {
  const { getNode } = useReactFlow();
  const managePair = useManagePair();
  const { add, remove } = useStore(store => store.playerSubscription);

  return useCallback(
    (connections: Edge[] | Connection[], type: ActionType) => {
      connections.forEach(connection => {
        const source = getNode(connection.source) as GameNode;
        const target = getNode(connection.target) as GameNode;

        if (type === "connect") {
          if (source.data.roles.includes("resource") && target.data.roles.includes("resource")) {
            managePair({ source, target, type });
            // in Theory i can get a group index from the store and check wanever there is a change check if there is a complete recipe or not
          }

          // connection between player and group entrance point
          if (source.data.roles.includes("player")) {
            add(source.id, target.id);
          }
        }

        if (type === "disconnect") {
          // TODO: now groups exist only for resources, but later on it can be various other things
          if (source.data.roles.includes("resource") && target.data.roles.includes("resource")) {
            managePair({ source, target, type });
          }

          if (source.data.roles.includes("player")) {
            remove(source.id);
          }
        }
      });
    },
    [add, getNode, managePair, remove],
  );
}
