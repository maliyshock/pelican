import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameNode } from "~/types";

export interface LinkPair {
  source: GameNode;
  target: GameNode;
  groupName: string;
}
export interface CreateGroup {
  nodes: GameNode[];
  groupName: string;
}
export interface DeleteGroup {
  groupName: string;
}

export interface AddToGroup {
  nodes: GameNode[];
  groupName: string;
  toEnd: boolean;
}

export interface JoinGroups {
  source: {
    nodes: GameNode[];
    groupName: string;
  };
  target: {
    nodes: GameNode[];
    groupName: string;
  };
  groupName: string;
}

export interface State {
  [key: string]: GameNode[];
}

const initialState: State = {};

// TODO ordered / unordered groups?
// ordered for recipes and unordered for enemies
export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    linkPair: (state, action: PayloadAction<LinkPair>) => {
      const { source, target, groupName } = action.payload;

      if (source && target) {
        const list: GameNode[] = [];

        list.push(source, target);
        state[groupName] = list;
      }

      return state;
    },

    createGroup: (state, action: PayloadAction<CreateGroup>) => {
      const { groupName, nodes } = action.payload;

      state[groupName] = nodes;
    },

    addToGroup: (state, action: PayloadAction<AddToGroup>) => {
      const { nodes, groupName, toEnd = true } = action.payload;
      const list: GameNode[] | undefined = state[groupName];

      if (list) {
        if (toEnd) {
          list.push(...nodes);
        } else {
          list.unshift(...nodes);
        }

        state[groupName] = list;
      }

      return state;
    },

    joinGroups: (state, action: PayloadAction<JoinGroups>) => {
      const { source, target, groupName } = action.payload;
      const nodes = source.nodes.concat(target.nodes);

      state[groupName] = nodes.map(node => ({ ...node, group: groupName }));
      delete state[source.groupName];
      delete state[target.groupName];
    },

    deleteGroup: (state, action: PayloadAction<DeleteGroup>) => {
      delete state[action.payload.groupName];
    },
  },
});

export const { linkPair, createGroup, addToGroup, joinGroups, deleteGroup } = groupsSlice.actions;
