import { GameNode } from "~/types";
import { State } from "~/slices/groups/groups.ts";

export function prependNodesToGroup(source: GameNode, target: GameNode, state: State) {
  const newState = { ...state };
  const index = state.lastSources[target.id];
  const linkedList = newState.groups[index];

  newState.lastSources[source.id] = index;
  delete state.lastSources[target.id];

  linkedList.unshift(source);

  return newState;
}
