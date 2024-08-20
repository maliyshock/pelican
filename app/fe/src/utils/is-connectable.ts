import { getIntersection } from "./get-intersection.ts";
import { Edge } from "@xyflow/react";
import { GameNode, RoleKind, connections } from "@pelican/constants";

interface IsConnectable {
  source: GameNode;
  target: GameNode;
  edges: Edge[];
}

// describes if nodes can be connected based on connection rules
// should debounce?
export function isConnectable({ source, target, edges }: IsConnectable) {
  const targetRoles = target.data.roles;
  const sourceRoles = source.data.roles;
  let intersections: RoleKind[] = [];
  let availableHandlers = target.data.inputs;

  // TODO: we should always have 1 limit for now.
  // is there connection ?
  // if (!isBelowLimit({ source, target, edges, connection })) {
  //   return false;
  // }

  if (target.data.inputs !== undefined) {
    const edgesOfTarget = edges.filter(edg => edg.target === target.id);

    // we need to get available handlers (with no edges)
    if (edgesOfTarget.length > 0) {
      // availableHandlers = target.data.inputs - edgesWithInputHandlers;
      availableHandlers = target.data.inputs.filter(socket => !edgesOfTarget.find(edg => edg.targetHandle === socket.id));
    }
  }

  for (let i = 0; i < sourceRoles.length; i++) {
    const role = sourceRoles[i];
    const recipesForRole = connections[role];

    if (recipesForRole === "ALL") return true;

    if (recipesForRole) {
      intersections = [...intersections, ...getIntersection(recipesForRole, targetRoles)];
    }
  }

  return intersections.length > 0 && availableHandlers && availableHandlers.length > 0;
}
