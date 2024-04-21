import { GameNode, GameObject } from "~/types";

interface ChangeValueBy {
  nodes: GameNode[];
  id: string;
  key: keyof GameObject;
  value: number;
}

// supports only numbers for now
export function changeNodeValueBy({ nodes, id, key, value }: ChangeValueBy) {
  return nodes.reduce((acc, node) => {
    const isKey = node["data"][key] as number;

    if (node.id === id && isKey) {
      const result = isKey + value;

      if (result > 0) {
        acc.push({
          ...node,
          data: {
            // harvest should be only for resource deposits, they must have health
            ...node["data"],
            [key]: result,
          },
        });
      }
    } else {
      acc.push(node);
    }

    return acc;
  }, [] as GameNode[]);
}
