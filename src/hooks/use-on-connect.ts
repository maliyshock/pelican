import { useCallback } from "react";
import { Connection, addEdge, useReactFlow } from "reactflow";
import { GameNode } from "~/types";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { useDispatch, useSelector } from "react-redux";
import { addToGroup, createGroup, joinGroups } from "~/slices/groups/groups.ts";
import { RootState } from "~/store";

export function useOnConnect() {
  const groups = useSelector((state: RootState) => state.groups);
  const { getNode, setEdges, setNodes } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (connection: Connection) => {
      // TODO: we need dissconnect actions delete / split etc
      const source = connection.source && getNode(connection.source);
      const target = connection.target && getNode(connection.target);

      if (!!source && !!target) {
        let ids: string[] = [];
        let groupName = "";

        // if we connecting 2 different groups together
        if (source.data.group && target.data.group) {
          const sourceNodes = groups[source.data.group];
          const targetNodes = groups[target.data.group];

          // TODO: the case when we have 2 chains
          // we split the first one in the middle and connected it to the end or beginning the second one
          // delete edge will probably not work
          // delete edge on drop implementation relates to that

          ids = sourceNodes.concat(targetNodes).map(item => item.id);

          groupName = `group_${Date.now()}`;
          dispatch(
            joinGroups({
              source: {
                nodes: sourceNodes,
                groupName: source.data.group,
              },
              target: {
                nodes: targetNodes,
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
          dispatch(createGroup({ source, target, groupName }));
          ids = [source.id, target.id];
        }

        setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids, key: "group", value: groupName }));
      }

      return setEdges(oldEdges => {
        // TODO: fix this hardcode later - there should be validation to the target input types and connection to specific one
        connection.sourceHandle = "handle-output-0";
        connection.targetHandle = "handle-input-0";

        // connection has id of source and target handles and also has id of source and target nodes itself
        return addEdge({ ...connection, type: "custom-edge" }, oldEdges);
      });
    },
    [getNode, setEdges],
  );
}
