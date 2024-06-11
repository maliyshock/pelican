import { EntityType, GameNode, Role } from "../../../common/src/types";

type Collection = {
  [key in Role]?: {
    [key in EntityType]?: number;
  };
};

interface GroupNodesByKey {
  nodes: GameNode[];
  initAcc: Collection;
  step?: number;
}

export function groupNodesByKey({ nodes, initAcc, step = 1 }: GroupNodesByKey): Collection {
  return nodes.reduce((accum, node) => {
    return node.data.roles.reduce((acc, role) => {
      const { type } = node.data;

      if (!acc[role]) {
        acc[role] = step > 0 ? { [type]: step } : undefined;
      } else if (acc[role]) {
        // @ts-ignore i have no idea why it throw an error here, i did check on undefined above
        acc[role][type] = acc[role][type] ? Math.max(0, acc[role][type] + step) : step;
      }

      return acc;
    }, accum);
  }, initAcc);
}
