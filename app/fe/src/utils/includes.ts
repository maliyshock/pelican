import { RoleKind } from "@pelican/constants";

export function includes(roles: RoleKind[], role: RoleKind) {
  return roles.includes(role);
}
