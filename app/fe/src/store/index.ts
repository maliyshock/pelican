import { configureStore } from "@reduxjs/toolkit";
import { screenSizeSlice } from "../slices/screen-size.ts";
import { actionsSlice } from "../slices/actions.ts";
import { playerSlice } from "../slices/player/player.ts";
import { timeSlice } from "../slices/time.ts";
import { nodesCounterSlice } from "../slices/nodes-counter.ts";
import { moneySlice } from "../slices/money.ts";
import { cmdSlice } from "../slices/cmd-is-pressed.ts";
import { resourceGroupsSlice } from "../slices/resource-groups.ts";
import { itemsToChooseSlice } from "../slices/items-to-choose.ts";
import { modalStatusSlice } from "../slices/modal-status.ts";

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice.reducer,
    actions: actionsSlice.reducer,
    player: playerSlice.reducer,
    time: timeSlice.reducer,
    nodesCounter: nodesCounterSlice.reducer,
    money: moneySlice.reducer,
    cmd: cmdSlice.reducer,
    resourceGroups: resourceGroupsSlice.reducer,
    itemsToChoose: itemsToChooseSlice.reducer,
    modalStatus: modalStatusSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
