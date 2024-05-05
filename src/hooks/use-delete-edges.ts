import { useCallback } from "react";
import { Edge, useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { GameNode } from "~/types";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { deleteGroup } from "~/slices/groups/groups.ts";
import { extractIds } from "~/utils/extractIds.ts";
import { useUpdateNodes } from "~/hooks/use-update-nodes.ts";

export function useDeleteEdges() {
  const { setEdges, setNodes, getNode } = useReactFlow();
  const groups = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const updateNodes = useUpdateNodes();

  return useCallback(
    (edgeIds: string[]) =>
      setEdges(edges =>
        // usually it is only 1 edge
        edges.filter((edg: Edge<any>) => {
          let oldGroup: string;
          // TODO: reactflow bug. We actually have connections, not edges here
          const sourceNode = getNode(edg.source);
          const targetNode = getNode(edg.target);

          if (!!sourceNode && !!targetNode) {
            oldGroup = sourceNode.data.group || targetNode.data.group;

            if (groups[oldGroup]) {
              if (groups[oldGroup].length === 2) {
                setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids: extractIds(groups[oldGroup]), key: "group", value: undefined }));
              } else {
                const newGroupFirst = `group_${Date.now()}`;
                const newGroupSecond = `group_${Date.now()}`;
                const splitIndex = groups[oldGroup].findIndex(node => node.id === sourceNode?.id) + 1;
                //TODO: if there is only 1 element - delete the group
                const firstHalf = groups[oldGroup].slice(0, splitIndex);
                const secondHalf = groups[oldGroup].slice(splitIndex, splitIndex);

                updateNodes(firstHalf, newGroupFirst);
                updateNodes(secondHalf, newGroupSecond);
              }

              dispatch(deleteGroup({ groupName: oldGroup }));
            }
          }

          return !edgeIds.includes(edg.id);
        }),
      ),
    [dispatch, getNode, groups, setEdges, setNodes, updateNodes],
  );
}
