import { ReactNode } from "react";
import { RegionKind, ResourceDepositKind, ResourceKind, RoleKind } from "~/types";
import { Node } from "reactflow";

type ReactFlowNode = Omit<Node, "data">;

export interface GameNode extends ReactFlowNode {
  data: GameNodeData;
}

export type Socket = {
  id: string;
  limit?: number;
  // type?: Resource; // type of material/resource in output (for machines)
};

export interface GameNodeData {
  roles: RoleKind[];
  type: string; // TODO: should be strict
  price?: number;
  title?: string;
  root?: string; // TODO: should be strict
  img: {
    src: string;
    alt: string;
  };
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
  quantity?: number;
  description?: ReactNode;
}

export type ResourceContainer = ResourceKind | ResourceDepositKind | RegionKind;
