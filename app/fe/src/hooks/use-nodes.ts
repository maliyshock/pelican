import { useCallback } from "react";
import { NodeChange, useNodesState } from "reactflow";
import { getAddedItems } from "~/utils/get-added-items.ts";
import { add } from "~/slices/nodes-counter.ts";
import { useDispatch } from "react-redux";
import { removeNodes } from "~/slices/resource-groups.ts";
import { INIT_NODES } from "~/constants";
import { GameNode } from "@pelican/constants";

export function useNodes() {
  const [nodes, , onNodesChange] = useNodesState(INIT_NODES);
  const dispatch = useDispatch();

  const handleOnNodesChange = useCallback(
    (nodeChanges: NodeChange[]) => {
      const addedItems = getAddedItems(nodeChanges);

      if (addedItems.length > 0) {
        dispatch(add(addedItems));
      }

      onNodesChange(nodeChanges);
    },
    [dispatch, onNodesChange],
  );

  const handleOnNodesDelete = useCallback(
    (nodes: GameNode[]) => {
      dispatch(removeNodes(nodes.filter(node => node.data.roles.includes("resource"))));
    },
    [dispatch],
  );

  return { handleOnNodesChange, handleOnNodesDelete, nodes };
}
