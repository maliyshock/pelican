import { RoleKind } from "~/types/roles";
import { ActionKind } from "~/types/actions";

export const ACTIONS_MAP = new Map<`${RoleKind}:${RoleKind}`, Set<ActionKind>>();

function addAction(actor: RoleKind, target: RoleKind, action: ActionKind) {
  const key = `${actor}:${target}` as const;

  if (!ACTIONS_MAP.has(key)) {
    ACTIONS_MAP.set(key, new Set());
  }

  ACTIONS_MAP.get(key)!.add(action);
}

addAction("player", "region", "explore");
addAction("player", "resource-deposit", "harvest");
addAction("player", "character", "fight");
addAction("player", "character", "talk");

addAction("food", "player", "eat");
addAction("herb", "player", "eat");
addAction("fuel", "fire-source", "burn");
