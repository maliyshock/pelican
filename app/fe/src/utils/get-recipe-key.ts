import { concatStrings } from "./concat-strings.ts";
import { CONCAT_SYMBOL, GameNode } from "@pelican/constants";

export function getRecipeKey(nodes: GameNode[]) {
  return nodes.reduce((acc, gameNode) => {
    acc = concatStrings(acc, gameNode.data.type, CONCAT_SYMBOL);

    return acc;
  }, "");
}
