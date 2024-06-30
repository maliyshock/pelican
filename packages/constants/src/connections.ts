import { RoleKind } from "~/types/roles";

export const outputs = {};

export const inputs = {};

type Connections = Partial<{
  [key in RoleKind]: RoleKind[] | "ALL";
}>;

// TODO: should actions and connections live together?
export const connections: Connections = {
  "resource": ["resource", "fire-source"],
  "food": ["player", "fire-source"],
  "herb": ["player", "herb"],
  "player": "ALL",
  "fire-source": "ALL",
};
