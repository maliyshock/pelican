import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { NodesCounter, groupNodeIdsByRole } from "~/utils/group-node-ids-by-role.ts";
import { INIT_NODES } from "~/constants";
import { GameNode } from "@pelican/constants";

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
        const nodesByRole = acc.nodesCounter.nodes[mainRole];

        if (nodesByRole && nodesByRole.length > 0) {
          acc = {
            ...acc,
            nodesCounter: {
              ...acc.nodesCounter,
              [mainRole]: nodesByRole.filter(id => id !== item.id),
            },
          };
        }

        return acc;
      }, newState);
    }),
  addNodes: (nodes: GameNode[]) =>
    set(state => {
      const newState = { ...state };

      return nodes.reduce((acc, item) => {
        const mainRole = item.data.roles[0];
        const nodesByRole = newState.nodesCounter.nodes[mainRole];

        if (nodesByRole && nodesByRole.length > 0) {
          nodesByRole.push(item.id);
          acc = {
            ...acc,
            nodesCounter: {
              ...acc.nodesCounter,
              [mainRole]: [...nodesByRole],
            },
          };
        }

        return acc;
      }, newState);
    }),
});
