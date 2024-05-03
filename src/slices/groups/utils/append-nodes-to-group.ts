import { GameNode } from "~/types";
import { State } from "~/slices/groups/groups.ts";

export function appendNodesToGroup(source: GameNode, target: GameNode, state: State) {
  const newState = { ...state };
  const index = state.lastTargets[source.id];
  const linkedList = newState.groups[index];

  newState.lastTargets[target.id] = index;
  delete state.lastTargets[source.id];

  linkedList.push(target);

  return newState;
}
