import { extractValue } from "~/utils/extract-value.ts";
import { EntityType, GameNode } from "~/types";
import { joinStrings } from "~/utils/join-strings.ts";

export function generateGroupName(nodes: GameNode[]) {
  return joinStrings(extractValue(nodes, "data.type") as EntityType[]);
}
