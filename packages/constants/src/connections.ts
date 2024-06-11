import { RoleKind } from "~/types/roles";

export const outputs = {};

export const inputs = {};

type Connections = Partial<{
  [key in RoleKind]: RoleKind[] | "ALL";
}>;

export const connections: Connections = {
  resource: ["resource"],
  player: "ALL",
};