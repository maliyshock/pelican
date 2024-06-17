import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { DirectedGraph, EntrancePoints } from "../utils/directed-graph.ts";
import { GameNode } from "@pelican/constants";

interface Pair {
  source: GameNode;
  target: GameNode;
}

interface Processing extends EntrancePoints {}

const graph = new DirectedGraph<GameNode>();

interface State {
  groups: GameNode[][];
  entrancePoints: EntrancePoints;
  processing: Processing;
  complete: string[];
}

export type ResourceGroupsSlice = {
  groups: GameNode[][];
  entrancePoints: EntrancePoints;
  processing: Processing;
  complete: string[];
  destroyGroup: (index: number) => void;
  linkPair: (pair: Pair) => void;
  removeNodes: (nodes: GameNode[]) => void;
  removeConnection: (pair: Pair) => void;
  setProcessing: (processing: Processing) => void;
  setComplete: (id: string) => void;
};

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
        ...state,
        resourceGroups: {
          ...state.resourceGroups,
          complete: newComplete,
          groups: newGroups,
        },
      };
    }),
  setProcessing: (processing: Processing) =>
    set(state => ({
      ...state,
      resourceGroups: {
        ...state.resourceGroups,
        processing: {
          ...state.resourceGroups.processing,
          ...processing,
        },
      },
    })),
  setComplete: (id: string) =>
    set(state => ({
      ...state,
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
        ...state,
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
        ...state,
        resourceGroups: {
          ...state.resourceGroups,
          ...graph.getResult(),
        },
      };
    }),
  removeConnection: (pair: Pair) =>
    set(state => {
      const { source, target } = pair;

      graph.removeConnection(source.id, target.id);

      return {
        ...state,
        resourceGroups: {
          ...state.resourceGroups,
          ...graph.getResult(),
        },
      };
    }),
});
