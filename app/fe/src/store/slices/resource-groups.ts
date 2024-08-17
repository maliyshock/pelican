import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { DirectedGraph, IndexMap } from "~/utils/directed-graph.ts";
import { GameNode } from "@pelican/constants";

export interface Pair {
  source: GameNode;
  target: GameNode;
}

const graph = new DirectedGraph<GameNode>();

interface State {
  groups: GameNode[][];
  entrancePoints: IndexMap;
  processing: IndexMap;
  complete: string[];
  nodesMap: IndexMap;
}

export interface ResourceGroupsSlice extends State {
  destroyGroup: (index: number) => void;
  linkPair: (pair: Pair) => void;
  removeNodes: (nodes: GameNode[]) => void;
  unlinkPair: (pair: Pair) => void;
  stopProcessing: (ids: string[]) => void;
  setProcessing: (processing: IndexMap) => void;
  setComplete: (id: string) => void;
}

const initialState: State = {
  ...graph.getResult(),
  processing: {},
  complete: [],
};

export const resourceGroupsSlice = (set: SetState<Store>) => ({
  ...initialState,
  destroyGroup: (index: number) =>
    set(state => {
      const groupElements = state.resourceGroups.groups[index];
      const ids = groupElements.map(el => el.id);

      ids.forEach(id => {
        delete state.resourceGroups.processing[id];
      });
      const newComplete = state.resourceGroups.complete.filter(id => !ids.includes(id));
      const newGroups = [...state.resourceGroups.groups];

      newGroups.splice(index, 1);

      return {
        resourceGroups: {
          ...state.resourceGroups,
          complete: newComplete,
          groups: newGroups,
        },
      };
    }),
  setProcessing: (processing: IndexMap) =>
    set(state => ({
      resourceGroups: {
        ...state.resourceGroups,
        processing: {
          ...state.resourceGroups.processing,
          ...processing,
        },
      },
    })),
  stopProcessing: (ids: string[]) =>
    set(state => {
      const newProcessing = { ...state.resourceGroups.processing };

      for (let id of ids) {
        delete newProcessing[id];
      }

      return {
        resourceGroups: {
          ...state.resourceGroups,
          processing: newProcessing,
        },
      };
    }),
  setComplete: (id: string) =>
    set(state => ({
      resourceGroups: {
        ...state.resourceGroups,
        complete: [...state.resourceGroups.complete, id],
      },
    })),
  linkPair: (pair: Pair) =>
    set(state => {
      const { source, target } = pair;

      if (source && target) {
        graph.addNode(source);
        graph.addNode(target);
        graph.addConnection(source.id, target.id);
      }

      return {
        resourceGroups: {
          ...state.resourceGroups,
          ...graph.getResult(),
        },
      };
    }),
  unlinkPair: (pair: Pair) =>
    set(state => {
      const { source, target } = pair;

      graph.removeConnection(source.id, target.id);

      return {
        resourceGroups: {
          ...state.resourceGroups,
          ...graph.getResult(),
        },
      };
    }),
  removeNodes: (nodes: GameNode[]) =>
    set(state => {
      nodes.forEach(node => graph.removeNode(node.id));

      return {
        resourceGroups: {
          ...state.resourceGroups,
          ...graph.getResult(),
        },
      };
    }),
});
