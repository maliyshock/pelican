import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameNode } from "~/types";
import { generateGroupName } from "~/utils/generate-group-name.ts";
import { AddToGroup, CreateGroup, DeleteGroup, JoinGroups, LinkPair, State } from "~/slices/groups/types.ts";

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
        state[groupName] = { elements: list, namesChain: generateGroupName(list) };
      }

      return state;
    },

    createGroup: (state, action: PayloadAction<CreateGroup>) => {
      const { groupName, nodes } = action.payload;

      state[groupName] = { elements: nodes, namesChain: generateGroupName(nodes) };
    },

    addToGroup: (state, action: PayloadAction<AddToGroup>) => {
      const { nodes, groupName, toEnd = true } = action.payload;
      const list: GameNode[] | undefined = state[groupName].elements;

      if (list) {
        if (toEnd) {
          list.push(...nodes);
        } else {
          list.unshift(...nodes);
        }

        state[groupName] = { elements: list, namesChain: generateGroupName(list) };
      }

      return state;
    },

    joinGroups: (state, action: PayloadAction<JoinGroups>) => {
      const { source, target, groupName } = action.payload;
      const nodes = source.nodes.concat(target.nodes);

      state[groupName].elements = nodes.map(node => ({ ...node, group: groupName }));
      state[groupName].namesChain = generateGroupName(nodes);
      delete state[source.groupName];
      delete state[target.groupName];
    },

    deleteGroup: (state, action: PayloadAction<DeleteGroup>) => {
      delete state[action.payload.groupName];
    },
  },
});

export const { linkPair, createGroup, addToGroup, joinGroups, deleteGroup } = groupsSlice.actions;
