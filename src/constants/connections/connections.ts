import { PLAYER, RESOURCE } from "~/constants/dictionary.ts";
import { Role } from "~/types";

export const outputs = {};

export const inputs = {};

type Connections = Partial<{
  [key in Role]: Role[] | "ALL";
}>;

export const connections: Connections = {
  [RESOURCE]: [RESOURCE],
  [PLAYER]: "ALL",
};
