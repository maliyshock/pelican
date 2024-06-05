import { GameNode } from "../../../common/src/types";

interface ChangeValueBy {
  nodes: GameNode[];
  ids: string[];
  key: "price" | "dmg" | "health" | "quantity";
  value?: number | string;
}

// supports only numbers for now
export function changeNodeValueBy({ nodes, ids, key, value }: ChangeValueBy) {
  return nodes.map(node => {
    const dataValue = node.data[key];
    const isNumber = typeof dataValue === "number" && typeof value === "number";

    if (ids.includes(node.id)) {
      return {
        ...node,
        data: {
          ...node.data,
          [key]: isNumber ? Math.max(0, dataValue + value) : value,
        },
      };
    }

    return node;
  });
}
