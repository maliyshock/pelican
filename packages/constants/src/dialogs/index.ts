import { FOX } from "~/nodes/characters/characters";
import { CompanionKind, DialogsByCompanion, FOX_DIALOGS } from "~/dialogs/fox";

export type Dialogs = {
  [k in CompanionKind]: DialogsByCompanion;
};

export const DIALOGS = {
  [FOX.type]: FOX_DIALOGS,
};
