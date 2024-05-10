import { extractValue } from "~/utils/extract-value.ts";
import { addToGroup, joinGroups, linkPair } from "~/slices/groups/groups.ts";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { GameNode } from "~/types";
import { RootState } from "~/store";

export function useSetGroup() {
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups);

  return useCallback(
    (source: GameNode, target: GameNode) => {
      let ids: string[] = [];
      let groupName = "";

      // if we connecting 2 different groups together
      if (source.data.group && target.data.group) {
        const sourceNodes = groups[source.data.group];
        const targetNodes = groups[target.data.group];

        ids = extractValue(sourceNodes.elements.concat(targetNodes.elements), "id");

        groupName = `group_${Date.now()}`;
        dispatch(
          joinGroups({
            source: {
              nodes: sourceNodes.elements,
              groupName: source.data.group,
            },
            target: {
              nodes: targetNodes.elements,
              groupName: source.data.group,
            },
            groupName,
          }),
        );
      } else if (target.data.group) {
        // infect with this group name, we assuming it is only one node
        groupName = target.data.group;
        ids = [source.id];

        // growing from the left
        dispatch(addToGroup({ nodes: [source], groupName, toEnd: false }));
      } else if (source.data.group) {
        groupName = source.data.group;
        ids = [target.id];

        // growing from the right
        dispatch(addToGroup({ nodes: [target], groupName, toEnd: true }));
      }

      if (target.data.group === undefined && source.data.group === undefined) {
        groupName = `group_${Date.now()}`;
        dispatch(linkPair({ source, target, groupName }));
        ids = [source.id, target.id];
      }

      return { ids, groupName };
    },
    [dispatch, groups],
  );
}
