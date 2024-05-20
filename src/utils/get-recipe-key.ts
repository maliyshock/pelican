import { concatStrings } from "~/utils/concat-strings.ts";
import { CONCAT_SYMBOL } from "~/constants/constants.ts";
import { GameNode } from "~/types";

export function getRecipeKey(nodes: GameNode[]) {
  return nodes.reduce((acc, gameNode) => {
    acc = concatStrings(acc, gameNode.data.type, CONCAT_SYMBOL);

    return acc;
  }, "");
}
