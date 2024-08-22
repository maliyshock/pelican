import { getIntersection } from "./get-intersection.ts";
import { Edge } from "@xyflow/react";
import { GameNode, RoleKind, connections } from "@pelican/constants";

interface IsConnectable {
  source: GameNode;
  target: GameNode;
  edges: Edge[];
}

function areIntersections(sourceRoles: RoleKind[], targetRoles: RoleKind[]) {
  let intersections: RoleKind[] = [];

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

function areAvailableHandlers(target: GameNode, edges: Edge[]) {
  let availableHandlers = target.data.inputs;

  if (target.data.inputs !== undefined) {
    const edgesOfTarget = edges.filter(edg => edg.target === target.id);

    // we need to get available handlers (with no edges)
    if (edgesOfTarget.length > 0) {
      // availableHandlers = target.data.inputs - edgesWithInputHandlers;
      availableHandlers = target.data.inputs.filter(socket => !edgesOfTarget.find(edg => edg.targetHandle === socket.id));
    }
  }

  return !!availableHandlers && availableHandlers.length > 0;
}

// describes if nodes can be connected based on connection rules
// should debounce?
export function isConnectable({ source, target, edges }: IsConnectable) {
  const targetRoles = target.data.roles;
  const sourceRoles = source.data.roles;

  return areIntersections(sourceRoles, targetRoles) && areAvailableHandlers(target, edges);
}
