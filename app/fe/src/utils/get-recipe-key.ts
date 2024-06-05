import { concatStrings } from "./concat-strings.ts";
import { CONCAT_SYMBOL } from "../../../common/constants";
import { GameNode } from "../../../common/src/types";

export function getRecipeKey(nodes: GameNode[]) {
  return nodes.reduce((acc, gameNode) => {
    acc = concatStrings(acc, gameNode.data.type, CONCAT_SYMBOL);

    return acc;
  }, "");
}
