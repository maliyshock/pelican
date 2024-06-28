import { ReactNode } from "react";
import { Node } from "reactflow";
import { RoleKind } from "~/types/roles";
import { TypeKind } from "~/types/build/type-kind";
import { Profile } from "~/nodes/player/pelican";

type ReactFlowNode = Omit<Node, "data">;
type SellItem = {
  price: number;
  data: GameNodeData;
};
type Sells = Record<"nodes", SellItem[]>;

export interface GameNode extends ReactFlowNode {
  data: GameNodeData;
}

export type Socket = {
  id: string;
  limit?: number;
  // type?: Resource; // type of material/resource in output (for machines)
};

export type Fire = {
  amount: number;
  max: number;
  maxOutputHeat: number;
  speed: number;
};

// TODO: different types of nodes
export interface GameNodeData {
  roles: RoleKind[];
  type: TypeKind;
  price?: number;
  title?: string;
  root?: TypeKind;
  img: {
    src: string;
    alt: string;
  };
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  maxHealth?: number;
  quantity?: number;
  description?: ReactNode;
  profile?: Profile;
  nutrition?: number;
  sells?: Sells;
  fire?: Fire;
  fuel?: number;
}
