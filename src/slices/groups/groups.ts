import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DirectedGraph } from "~/utils/directed-graph.ts";
import { GameNode } from "~/types";

interface Pair {
  source: GameNode;
  target: GameNode;
}

// TODO: room for refactoring? quicker way to find if there is a connection?
const graph = new DirectedGraph();

export const groupsSlice = createSlice({
  name: "groups",
  initialState: graph.findGroups(),
  reducers: {
    linkPair: (state, action: PayloadAction<Pair>) => {
      const { source, target } = action.payload;

      if (source && target) {
        graph.addNode(source);
        graph.addNode(target);
        graph.addConnection(source.id, target.id);
      }

      state = graph.findGroups();

      return state;
    },
    // in case there is no connections left - remove it from the group
    // remove it from the graph... i guess
    removeNodes: (state, action: PayloadAction<GameNode[]>) => {
      action.payload.forEach(node => graph.removeNode(node.id));
      state = graph.findGroups();

      return state;
    },
    removeConnection: (state, action: PayloadAction<Pair>) => {
      const { source, target } = action.payload;

      graph.removeConnection(source.id, target.id);
      state = graph.findGroups();

      return state;
    },
  },
});

export const { linkPair, removeNodes, removeConnection } = groupsSlice.actions;
