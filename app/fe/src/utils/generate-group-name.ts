import { extractValue } from "./extract-value.ts";
import { EntityType, GameNode } from "../../../common/src/types";
import { joinStrings } from "~/utils/join-strings.ts";

export function generateGroupName(nodes: GameNode[]) {
  return joinStrings(extractValue(nodes, "data.type") as EntityType[]);
}
