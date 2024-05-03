import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { GameNode } from "~/types";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { splitGroup } from "~/slices/groups/groups.ts";

export function useDeleteEdges() {
  const { setEdges, setNodes } = useReactFlow();
  const groups = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  return useCallback(
    (edgeIds: string[]) =>
      setEdges(edges =>
        edges.filter(edg => {
          let oldGroup: string;

          if(!!edg.sourceNode && !!edg.targetNode) {
            oldGroup = edg.sourceNode.data.group || edg.targetNode.data.group;

            // we are splitting them, so they both had the same group
            // we have to create new group name for both groups
            const newGroupName = `group_${Date.now()}`;
            const newGroupName2 = `group_${Date.now()}`;

            // TODO: get first half and second half
            // by gettin the whole group

            groups[oldGroup].findIndex(node => node.id === edg.sourceNode.id);

            // if length of the group is 1 remove the item from the group

            if (oldGroup !== undefined) {
              // react flow has source and target node undefined - might when we not connected nodes yet
              dispatch(splitGroup({ source: edg.sourceNode, groupName: oldGroup }));
              setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: , key: "group", value: newGroupName }));
              setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: , key: "group", value: newGroupName }));
            }
          }

          return !edgeIds.includes(edg.id);
        }),
      ),
    [groups, setEdges, setNodes],
  );
}
