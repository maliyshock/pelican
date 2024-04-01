import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applyEdgeChanges, Edge, EdgeChange, addEdge as reactFlowAddEdge, Connection, updateEdge as reactFlowUpdateEdge } from "reactflow";

const initialState: Edge[] = [];

export const edgesSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    setEdgeChanges: (state, action: PayloadAction<EdgeChange[]>) => {
      return applyEdgeChanges(action.payload, state);
    },
    addEdge: (state, action: PayloadAction<Connection>) => {
      const edge = { ...action.payload, type: "custom-edge" };

      return reactFlowAddEdge(edge, state);
    },
    updateEdge: (state, action: PayloadAction<{ oldEdge: Edge; newConnection: Connection }>) => {
      return reactFlowUpdateEdge(action.payload.oldEdge, action.payload.newConnection, state);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      return state.filter(e => e.id !== action.payload);
    },
  },
});

export const { setEdgeChanges, addEdge, updateEdge, removeEdge } = edgesSlice.actions;
