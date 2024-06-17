import { create } from "zustand";
import { ActionsSlice, actionsSlice } from "~/slices/actions.ts";
import { CmdSlice, cmdSlice } from "~/slices/cmd-is-pressed.ts";
import { ItemsToChooseSlice, itemsToChooseSlice } from "~/slices/items-to-choose.ts";
import { ModalStatusSlice, modalStatusSlice } from "~/slices/modal-status.ts";
import { MoneySlice, moneySlice } from "~/slices/money.ts";
import { TimeSlice, timeSlice } from "~/slices/time.ts";
import { ScreenSizeSlice, screenSizeSlice } from "~/slices/screen-size.ts";
import { ResourceGroupsSlice, resourceGroupsSlice } from "~/slices/resource-groups.ts";
import { NodesCounterSlice, groupNodesIdsSlice } from "~/slices/nodes-counter.ts";

export type Store = ActionsSlice & { nodesCounter: NodesCounterSlice } & CmdSlice & { choice: ItemsToChooseSlice } & { modal: ModalStatusSlice } & MoneySlice &
  TimeSlice &
  ScreenSizeSlice & {
    resourceGroups: ResourceGroupsSlice;
  };

const useStore = create<Store>(set => ({
  ...actionsSlice(set),
  nodesCounter: { ...groupNodesIdsSlice(set) },
  ...cmdSlice(set),
  choice: {
    ...itemsToChooseSlice(set),
  },
  modal: { ...modalStatusSlice(set) },
  ...moneySlice(set),
  ...timeSlice(set),
  ...screenSizeSlice(set),
  resourceGroups: { ...resourceGroupsSlice(set) },
}));

export default useStore;
