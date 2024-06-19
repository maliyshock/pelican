import { GameNode, RoleKind } from "@pelican/constants";

export type NodesCounter = Record<RoleKind, string[]>;

interface GroupNodeIdsByRole {
  nodes: GameNode[];
  initAcc: NodesCounter;
}

export function groupNodeIdsByRole({ nodes, initAcc }: GroupNodeIdsByRole) {
  return nodes.reduce((acc, node) => {
    const mainRole = node.data.roles[0];

    return {
      ...acc,
      [mainRole]: acc[mainRole] ? [...acc[mainRole], node.id] : [node.id],
    };

    // return node.data.roles.reduce((acc: Partial<Collection>, role: RoleKind) => {
    //   const { type } = node.data;
    //   const isPlayer = role === "player";
    //   const accRole = acc[role];
    //
    //   if (!accRole) {
    //     acc[role] = { [type]: isPlayer ? [node.id] : step } as Record<TypeKind, string[] | number>;
    //   } else if (acc[role]) {
    //     if (isPlayer) {
    //       accRole[type] = accRole[type] ? [...(accRole[type] as string[]), type] : [type];
    //     } else {
    //       accRole[type] = accRole[type] ? Math.max(0, (accRole[type] as number) + step) : step;
    //     }
    //   }
    //
    //   return acc;
    // }, accum);
  }, initAcc);
}
