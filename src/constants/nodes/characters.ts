import { CHARACTER, FOX, PELICAN, PLAYER } from "~/constants/dictionary.ts";
import { GameObject } from "~/types";

export const PELICAN_OBJECT: GameObject = {
  dmg: 1,
  health: 10,
  // name: "George",
  type: PELICAN,
  roles: [PLAYER],
};

export const FOX_OBJECT: GameObject = {
  dmg: 15,
  health: 35,
  title: "Fox",
  type: FOX,
  roles: [CHARACTER],
};
