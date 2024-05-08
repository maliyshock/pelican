import { useReactFlow } from "reactflow";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { GameNode } from "~/types";
import { createGroup } from "~/slices/groups/groups.ts";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { extractValue } from "~/utils/extract-value.ts";

export function useUpdateOnSplit() {
  const { setNodes } = useReactFlow();
  const dispatch = useDispatch();

  return useCallback(
    (nodesToUpdate: GameNode[], groupName: string) => {
      if (nodesToUpdate.length > 1) {
        dispatch(createGroup({ groupName, nodes: nodesToUpdate }));
      }

      const ids = extractValue(nodesToUpdate, "id");

      setNodes((nodes: GameNode[]) => changeNodeValueBy({ nodes, ids, key: "group", value: nodesToUpdate.length > 1 ? groupName : undefined }));
    },
    [dispatch, setNodes],
  );
}
