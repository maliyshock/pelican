import useStore from "~/store/use-store.ts";
import { useCallback } from "react";
import { Pair } from "~/store/slices/resource-groups.ts";
import { ActionType } from "~/hooks/use-connection-manager/use-connection-manager.ts";
import { GameNode } from "@pelican/constants";

interface ManagePairArgs extends Pair {
  type: ActionType;
}

export function useManagePair() {
  const { groups, nodesMap, linkPair, unlinkPair, stopProcessing } = useStore(store => store.resourceGroups);
  const { deleteActions } = useStore(store => store.actions);

  // check if there is a group
  // reset processing and all current actions of source/target and other group members
  // another action should be triggered in place of usage
  return useCallback(
    ({ source, target, type }: ManagePairArgs) => {
      const sourceGroup: number | undefined = nodesMap[source.id];
      const targetGroup: number | undefined = nodesMap[target.id];
      let allElements: GameNode[] = [];

      allElements.push(...(sourceGroup !== undefined ? groups[sourceGroup] : [source]));
      allElements.push(...(targetGroup !== undefined ? groups[targetGroup] : [target]));

      const ids = allElements.map(item => item.id);

      stopProcessing(ids);
      deleteActions(ids);
      if (type === "connect") {
        linkPair({ source, target });
      } else {
        unlinkPair({ source, target });
      }
    },
    [deleteActions, groups, linkPair, nodesMap, stopProcessing, unlinkPair],
  );
}
