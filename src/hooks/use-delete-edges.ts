import { useCallback } from "react";
import { Edge, useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { createGroup, deleteGroup } from "~/slices/groups/groups.ts";
import { useUpdateOnSplit } from "~/hooks/use-update-on-split.ts";
import { GameNode } from "~/types";

type SplitGroups = {
  [key: string]: number[];
};

export function useManageGroupSplitting() {
  const { getNode } = useReactFlow();
  const groups = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const updateOnSplit = useUpdateOnSplit();

  return useCallback(
    (edgesToDelete: Edge[]) => {
      const splitPoints = edgesToDelete.reduce((acc: SplitGroups, edg) => {
        const sourceNode = getNode(edg.source);
        const targetNode = getNode(edg.target);
        const oldGroup = sourceNode?.data.group || targetNode?.data.group;

        const splitIndex = groups[oldGroup]?.elements.findIndex(node => node.id === edg.source);

        if (oldGroup && splitIndex >= 0) {
          if (acc[oldGroup]) {
            acc[oldGroup].push(splitIndex);
          } else {
            acc = { ...acc, [oldGroup]: [splitIndex] };
          }
        }

        return acc;
      }, {});

      const updates: GameNode[] = []; // - list of nodes and their groupNames

      for (const oldGroup in splitPoints) {
        const groupNodes = groups[oldGroup].elements; // [el1,el2,el3,el4,el5,el6,el7,el8,el9,el10]

        splitPoints[oldGroup].forEach((splitIndex, loopIndex) => {
          const prevSplitIndex = splitPoints[oldGroup][loopIndex - 1] || 0;

          if (splitIndex === 0 || (prevSplitIndex !== undefined && splitIndex + 1 - prevSplitIndex === 1)) {
            updates.push({ ...groupNodes[0], data: { ...groupNodes[0].data, group: undefined } });
          } else {
            const newGroupName = `group_${Date.now()}`;
            const newGroup = groupNodes.slice(prevSplitIndex, splitIndex + 1).map(node => ({ ...node, group: newGroupName }));

            updates.push(...newGroup);
            dispatch(createGroup({ groupName: newGroupName, nodes: newGroup }));
          }

          dispatch(deleteGroup({ groupName: oldGroup }));
        }); // [0, 3, 4, 7]
      }

      updateOnSplit(updates);
    },
    [dispatch, getNode, groups, updateOnSplit],
  );
}
