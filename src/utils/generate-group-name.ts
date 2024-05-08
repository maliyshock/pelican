import { extractValue } from "~/utils/extract-value.ts";
import { EntityType, GameNode } from "~/types";

export function generateGroupName(nodes: GameNode[]) {
  return (extractValue(nodes, "data.type") as EntityType[]).join("+");
}
