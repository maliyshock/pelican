import { GameNode } from "~/types";

interface ChangeValueBy {
  nodes: GameNode[];
  id: string;
  key: "price" | "dmg" | "health" | "quantity";
  value: number;
}

// supports only numbers for now
export function changeNodeValueBy({ nodes, id, key, value }: ChangeValueBy) {
  return nodes.map(node => {
    const dataValue = node.data[key];

    if (node.id === id && typeof dataValue === "number") {
      return {
        ...node,
        data: {
          ...node.data,
          [key]: Math.max(0, dataValue + value),
        },
      };
    }

    return node;
  });
}
