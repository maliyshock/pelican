import { NodeChange } from "reactflow";
import { GameNode } from "~/types";

export function getAddedItems(changes: NodeChange[]) {
  return changes.reduce((acc: GameNode[], change) => {
    if (change.type === "add") {
      acc.push(change.item);
    }

    return acc;
  }, []);
}
