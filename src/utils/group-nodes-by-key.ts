import { EntityType, GameNode, ObjectType } from "~/types";

type Collection = {
  [key in ObjectType]?: {
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
    return node.data.roles.reduce((acc, type) => {
      const keyName = node.data.type;

      if (!acc[type]) {
        acc[type] = step > 0 ? { [keyName]: step } : undefined;
      } else if (acc[type]) {
        acc[type]![keyName] = acc[type]![keyName] ? Math.max(0, acc[type]![keyName]! + step) : step;
      }

      return acc;
    }, accum);
  }, initAcc);
}
