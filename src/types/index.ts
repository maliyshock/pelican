import { Node } from "reactflow";

export type Action = "explore" | "harvest";
export type ObjectType = "player" | "object" | "creature" | "world" | "resource";

type ReactFlowNode = Omit<Node, "data">;

export interface GameNode extends ReactFlowNode {
  data: GameObject;
}

type Socket = {
  id: string;
  name: string;
  type: "input" | "output";
};

export type GameObject = {
  name?: string;
  color?: string;
  img?: {
    src: string;
    alt: string;
  };
  objectType: ObjectType;
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  grabbable?: boolean;
  action?: {
    actionName: Action;
    source: string;
    actionTime: number;
  };
};

export type AutocompleteResult<T> = {
  id: string;
  name: string;
  value: T;
};
