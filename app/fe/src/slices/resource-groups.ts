import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DirectedGraph, EntrancePoints } from "../utils/directed-graph.ts";
import { GameNode } from "../../../common/src/types";

interface Pair {
  source: GameNode;
  target: GameNode;
}

interface Processing extends EntrancePoints {}

const graph = new DirectedGraph<GameNode>();

interface State {
  groups: GameNode[][];
  entrancePoints: EntrancePoints; // list of the entrance points
  processing: Processing; // list of nodes we are waiting to finish the crafting timer
  complete: string[]; // array of ids which completed their crafting
}

const initialState: State = {
  ...graph.getResult(),
  processing: {},
  complete: [],
};

export const resourceGroupsSlice = createSlice({
  name: "resourceGroups",
  initialState,
  reducers: {
    destroyGroup: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const groupElements = state.groups[index];
      const ids = groupElements.map(el => el.id);

      ids.forEach(id => {
        delete state.processing[id];
      });
      state.complete = state.complete.filter(id => !ids.includes(id));
      state.groups = state.groups.splice(index, 1);
    },
    processing: (state, action: PayloadAction<Processing>) => {
      return {
        ...state,
        processing: {
          ...state.processing,
          ...action.payload,
        },
      };
    },
    complete: (state, action: PayloadAction<string>) => {
      state.complete.push(action.payload);
    },
    linkPair: (state, action: PayloadAction<Pair>) => {
      const { source, target } = action.payload;

      if (source && target) {
        graph.addNode(source);
        graph.addNode(target);
        graph.addConnection(source.id, target.id);
      }

      return { ...state, ...graph.getResult() };
    },
    // in case there is no connections left remove it from the group
    removeNodes: (state, action: PayloadAction<GameNode[]>) => {
      action.payload.forEach(node => graph.removeNode(node.id));

      return { ...state, ...graph.getResult() };
    },
    removeConnection: (state, action: PayloadAction<Pair>) => {
      const { source, target } = action.payload;

      graph.removeConnection(source.id, target.id);

      return { ...state, ...graph.getResult() };
    },
  },
});

export const { linkPair, removeNodes, removeConnection, destroyGroup, processing, complete } = resourceGroupsSlice.actions;
