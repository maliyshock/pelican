import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameNode } from "~/types";

export interface CreateGroup {
  source: GameNode;
  target: GameNode;
  groupName: string;
}
export interface SplitGroup {
  source: GameNode;
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

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<CreateGroup>) => {
      const { source, target, groupName } = action.payload;

      if (source && target) {
        const list = [];

        // TODO: this will not work
        // мне нужны графы здесь
        // потому что даже для крафтинга система может быть не линейной
        // тем более для врагов и производственных цепочек
        // поэтому у одной ноды может быть потенциально несколько связей
        list.push(source, target);

        state[groupName] = list;
      }

      return state;
    },

    addToGroup: (state, action: PayloadAction<AddToGroup>) => {
      const { nodes, groupName, toEnd = true } = action.payload;
      const list: GameNode[] | undefined = state[groupName];

      if (list) {
        // TODO: we do not need to push all nodes. only target or source
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

    splitGroup: (state, action: PayloadAction<SplitGroup>) => {
      const { source, groupName } = action.payload;
      const sliceIndex = state[groupName].findIndex(node => node.id === source.id);

      // find group by group name
      // get place of split
    },
  },
});

export const { createGroup, addToGroup, joinGroups, splitGroup } = groupsSlice.actions;
