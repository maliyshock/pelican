import { GameNode, RoleKind, TypeKind } from "@pelican/constants";

export type Collection = Record<RoleKind, Record<TypeKind, string[] | number>>;

interface GroupNodesByKey {
  nodes: GameNode[];
  initAcc: Collection | Partial<Collection>;
  step?: number;
}

export function groupNodesByKey({ nodes, initAcc, step = 1 }: GroupNodesByKey) {
  return nodes.reduce((accum, node) => {
    return node.data.roles.reduce((acc: Partial<Collection>, role: RoleKind) => {
      const { type } = node.data;
      const isPlayer = role === "player";
      const accRole = acc[role];

      if (!accRole) {
        acc[role] = { [type]: isPlayer ? [node.id] : step } as Record<TypeKind, string[] | number>;
      } else if (acc[role]) {
        if (isPlayer) {
          accRole[type] = accRole[type] ? [...(accRole[type] as string[]), type] : [type];
        } else {
          accRole[type] = accRole[type] ? Math.max(0, (accRole[type] as number) + step) : step;
        }
      }

      return acc;
    }, accum);
  }, initAcc);
}
