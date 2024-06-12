import { ReactNode } from "react";
import { Node } from "reactflow";
import { RoleKind } from "~/types/roles";
import { TypeKind } from "~/types/build/type-kind";

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
  quantity?: number;
  description?: ReactNode;
}
