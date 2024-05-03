import { GameNode, Role } from "~/types";
import { connections } from "~/constants/connections/connections.ts";
import { getIntersection } from "~/utils/get-intersection.ts";

// TODO: do we need one?
export function isConnectable(source: GameNode, target: GameNode) {
  const targetRoles = target.data.roles;
  const sourceRoles = source.data.roles;
  let intersections: Role[] = [];

  for (let i = 0; i < sourceRoles.length; i++) {
    const role = sourceRoles[i];
    const recipesForRole = connections[role];

    if (recipesForRole === "ALL") return true;

    if (recipesForRole) {
      intersections = [...intersections, ...getIntersection(recipesForRole, targetRoles)];
    }
  }

  return intersections.length > 0;
}
