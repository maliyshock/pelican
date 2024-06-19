import { GameNode, RoleKind, TypeKind } from "@pelican/constants";

export type Item = Record<TypeKind, { [key: string]: GameNode }>;
export type NodesCounter = Record<RoleKind, Item>;

interface GroupNodeIdsByRole {
  nodes: GameNode[];
  initAcc: NodesCounter;
}

export function groupNodeIdsByRole({ nodes, initAcc }: GroupNodeIdsByRole) {
  return nodes.reduce((acc, node) => {
    const mainRole = node.data.roles[0];
    const { type } = node.data;

    if (type) {
      if (mainRole in acc) {
        if (type in acc[mainRole]) {
          return {
            ...acc,
            [mainRole]: {
              ...acc[mainRole],
              [type]: {
                ...acc[mainRole][type],
                [node.id]: node,
              },
            },
          };
        } else {
          return {
            ...acc,
            [mainRole]: {
              ...acc[mainRole],
              [type]: {
                [node.id]: node,
              },
            },
          };
        }
      } else {
        acc[mainRole] = {
          [type]: { [node.id]: node },
        } as Item;
      }
    }

    return acc;
  }, initAcc);
}
