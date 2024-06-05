import { PLAYER, RESOURCE } from "../../../common/src/constants/dictionary.ts";
import { Role } from "../../../common/src/types";

export const outputs = {};

export const inputs = {};

type Connections = Partial<{
  [key in Role]: Role[] | "ALL";
}>;

export const connections: Connections = {
  [RESOURCE]: [RESOURCE],
  [PLAYER]: "ALL",
};
