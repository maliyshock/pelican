import { Node } from "reactflow";

type ObjectType = "player" | "object" | "creature" | "world";

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
};

export type AutocompleteResult<T> = {
  id: string;
  name: string;
  value: T;
};
