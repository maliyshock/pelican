import { useCallback } from "react";
import { Edge } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { deleteGroup } from "~/slices/groups/groups.ts";
import { useUpdateOnSplit } from "~/hooks/use-update-on-split.ts";

type SplitGroups = {
  [key: string]: number[];
};

export function useManageGroupSplitting() {
  const groups = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const updateOnSplit = useUpdateOnSplit();

  return useCallback(
    (edgesToDelete: Edge[]) => {
      //TODO: imagine a case when multiple nodes connected and not connected ones has been deleted
      // TODO: can be multiple edges
      // for every deleted edge define the index of split and the group
      // what if there were multiple splits in the same group?
      // what if there were multiple edges of the same node

      const splitPoints = edgesToDelete.reduce((acc: SplitGroups, edg) => {
        const oldGroup: string = edg.sourceNode?.data.group || edg.targetNode?.data.group;
        const splitIndex = groups[oldGroup].elements.findIndex(node => node.id === edg.sourceNode?.id) + 1;

        if (oldGroup && splitIndex >= 0) {
          if (acc[oldGroup]) {
            acc = { ...acc, [oldGroup]: [splitIndex] };
          } else {
            acc[oldGroup].push(splitIndex);
          }
        }

        return acc;
      }, {});

      splitPoints.forEach(split => {
        const { oldGroup, splitIndex } = split;

        if (groups[oldGroup]) {
          const newGroupFirst = `group_${Date.now()}`;
          const newGroupSecond = `group_${Date.now()}`;
          const firstHalf = groups[oldGroup].elements.slice(0, splitIndex);
          const secondHalf = groups[oldGroup].elements.slice(splitIndex, splitIndex);

          // will automatically clean the group if there is only 1 element in array
          updateOnSplit(firstHalf, newGroupFirst);
          updateOnSplit(secondHalf, newGroupSecond);
        }

        dispatch(deleteGroup({ groupName: oldGroup }));
      });
    },
    [dispatch, groups, updateOnSplit],
  );
}
