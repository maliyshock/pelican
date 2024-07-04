import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { NodesCounter, groupNodeIdsByRole } from "~/utils/group-node-ids-by-role.ts";
import { INIT_NODES } from "~/constants";
import { GameNode } from "@pelican/constants";
import { cloneDeep, unset } from "lodash";

export type NodesCounterSlice = {
  nodes: NodesCounter;
  addNodes: (nodes: GameNode[]) => void;
  removeNodes: (nodes: GameNode[]) => void;
};

export const groupNodesIdsSlice = (set: SetState<Store>) => ({
  nodes: groupNodeIdsByRole({ nodes: INIT_NODES, initAcc: {} as NodesCounter }),
  setNodes: (nodes: GameNode[]) =>
    set(state => ({
      ...state,
      nodesCounter: {
        ...state.nodesCounter,
        nodes: groupNodeIdsByRole({ nodes, initAcc: state.nodesCounter.nodes }),
      },
    })),
  removeNodes: (nodes: GameNode[]) =>
    set(state => {
      const newState = { ...state };

      return nodes.reduce((acc, item) => {
        const mainRole = item.data.roles[0];
        const newNodes = cloneDeep(acc.nodesCounter.nodes);

        unset(newNodes, [mainRole, item.data.type, item.id]);

        return acc;
      }, newState);
    }),
  addNodes: (nodes: GameNode[]) =>
    set(state => {
      const newState = { ...state };

      return nodes.reduce((acc, item) => {
        const mainRole = item.data.roles[0];
        const nodesByRole = newState.nodesCounter.nodes[mainRole];

        if (nodesByRole) {
          acc = {
            ...acc,
            nodesCounter: {
              ...acc.nodesCounter,
              nodes: {
                ...acc.nodesCounter.nodes,
                [mainRole]: { ...acc.nodesCounter.nodes[mainRole], ...nodesByRole },
              },
            },
          };
        }

        return acc;
      }, newState);
    }),
});
