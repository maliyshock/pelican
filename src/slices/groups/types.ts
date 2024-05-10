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

interface Group {
  namesChain: string;
  elements: GameNode[];
}

export interface State {
  [key: string]: Group;
}
