import { GameNode } from "~/types";

export function extractIds(nodes: GameNode[]) {
  return nodes.map(n => n.id);
}
