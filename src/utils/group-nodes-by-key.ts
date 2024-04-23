import { GameNode, ObjectKeyName, ObjectType } from "~/types";

type Collection = {
  [key in ObjectType]?: {
    [key in ObjectKeyName]?: number;
  };
};

interface GroupNodesByKey {
  nodes: GameNode[];
  initAcc: Collection;
}

export function groupNodesByKey({ nodes, initAcc }: GroupNodesByKey): Collection {
  return nodes.reduce((accum, node) => {
    return node.data.objectType.reduce((acc, type) => {
      const keyName = node.data.objectKeyName;
      const objType = acc[type];

      if (objType !== undefined) {
        const resource = objType[keyName];

        if (resource) {
          acc[type]![keyName]!++;
        } else {
          acc[type]![keyName] = 1;
        }
      } else {
        acc[type] = { [keyName]: 1 };
      }

      return acc;
    }, accum);
  }, initAcc);
}
