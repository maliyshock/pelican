import { create } from "zustand";
import { ActionsSlice, actionsSlice } from "~/store/slices/actions.ts";
import { CmdSlice, cmdSlice } from "~/store/slices/cmd-is-pressed.ts";
import { ItemsToChooseSlice, itemsToChooseSlice } from "~/store/slices/items-to-choose.ts";
import { ModalStatusSlice, modalStatusSlice } from "~/store/slices/modal-status.ts";
import { MoneySlice, moneySlice } from "~/store/slices/money.ts";
import { TimeSlice, timeSlice } from "~/store/slices/time.ts";
import { ScreenSizeSlice, screenSizeSlice } from "~/store/slices/screen-size.ts";
import { ResourceGroupsSlice, resourceGroupsSlice } from "~/store/slices/resource-groups.ts";
import { NodesCounterSlice, groupNodesIdsSlice } from "~/store/slices/nodes-counter.ts";
import { TalkSlice, talkSlice } from "~/store/slices/talk.ts";
import { PlayerSubscriptions, playerSubscriptionSlice } from "~/store/slices/player-subscriptions.ts";
import { nodeChangesSlice, NodeChangesSlice } from "~/store/slices/node-changes.ts";
import { MapSizeSlice, mapSizeSlice } from "~/store/slices/map-size.ts";

// prettier-ignore
export type Store =
  { actions: ActionsSlice } &
  { nodesCounter: NodesCounterSlice } &
  { cmd: CmdSlice } &
  { choice: ItemsToChooseSlice } &
  { modal: ModalStatusSlice;} &
  { money: MoneySlice } &
  TimeSlice &
  ScreenSizeSlice &
  { resourceGroups: ResourceGroupsSlice } &
  { talk: TalkSlice } &
  { playerSubscription: PlayerSubscriptions} &
  { nodeChanges: NodeChangesSlice} &
  { mapSize: MapSizeSlice };

const useStore = create<Store>(set => ({
  actions: actionsSlice(set),
  nodesCounter: groupNodesIdsSlice(set),
  cmd: cmdSlice(set),
  choice: itemsToChooseSlice(set),
  modal: modalStatusSlice(set),
  money: moneySlice(set),
  ...timeSlice(set),
  ...screenSizeSlice(set),
  resourceGroups: resourceGroupsSlice(set),
  talk: talkSlice(set),
  playerSubscription: playerSubscriptionSlice(set),
  nodeChanges: nodeChangesSlice(set),
  mapSize: mapSizeSlice(set),
}));

export default useStore;
