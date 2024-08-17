import { ReactNode } from "react";
import { Node } from "@xyflow/react";
import { RoleKind } from "~/types/roles";
import { TypeKind } from "~/types/build/type-kind";
import { Profile } from "~/nodes/player/pelican";
import { StatusKind } from "~/types/statuses";

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

export type Statuses = Partial<Record<StatusKind, number>>;

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
  regenSpeed?: number;
  regenIsActive?: false;
  quantity?: number;
  description?: ReactNode;
  profile?: Profile;
  nutrition?: number;
  sells?: Sells;
  fire?: Fire;
  fuel?: number;
  onConsume?: Statuses;
  statuses?: Statuses;
}

// export interface Character extends Omit<GameNodeData, "price"> {
//   roles: RoleKind[];
//   type: TypeKind;
//   title?: string;
//   img: {
//     src: string;
//     alt: string;
//   };
//   inputs?: Socket[];
//   outputs?: Socket[];
//   dmg?: number;
//   health?: number;
//   maxHealth?: number;
//   description?: ReactNode;
//   profile?: Profile;
//   sells?: Sells;
//   statuses?: StatusKind[];
// }

// TODO: different types of nodes
// export interface GameNodeData {
//   roles: RoleKind[];
//   type: TypeKind;
//   title?: string;
//   img: {
//     src: string;
//     alt: string;
//   };
//   inputs?: Socket[];
//   outputs?: Socket[];
//   health?: number;
//   maxHealth?: number;
//   price?: number;
// }

// export interface FireSource extends GameNodeData {
//   fire?: Fire;
// }
//
// export interface Consumable extends GameNodeData {
//   onConsume?: StatusKind;
// }
//
// export interface Fuel extends GameNodeData {
//   fuel?: number;
// }
