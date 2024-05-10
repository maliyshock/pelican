import { GameNode, Role } from "~/types";
import { connections } from "~/constants/connections/connections.ts";
import { getIntersection } from "~/utils/get-intersection.ts";
import { Connection, Edge } from "reactflow";
import { isBelowLimit } from "~/utils/check-handle-limits.ts";

interface IsConnectable {
  source: GameNode;
  target: GameNode;
  connection: Connection;
  edges: Edge[];
}

// describes if nodes can be connected based on connection rules
// should debounce?
export function isConnectable({ source, target, edges, connection }: IsConnectable) {
  const targetRoles = target.data.roles;
  const sourceRoles = source.data.roles;
  let intersections: Role[] = [];

  if (!isBelowLimit({ source, target, edges, connection })) {
    return false;
  }

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
