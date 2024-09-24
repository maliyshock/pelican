import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";
import { FOREST, TRANQUIL_GLADE } from "~/nodes/regions/regions";

export type SellItem = {
  price: number;
  data: GameNodeData;
};

export type Sells = {
  nodes: SellItem[];
};

const SELLS: Sells = {
  nodes: [
    {
      price: 5,
      data: TRANQUIL_GLADE,
    },
    {
      price: 10,
      data: FOREST,
    },
  ],
};

export const FOX: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("fox"),
  type: "fox",
  title: "Fox",
  roles: ["character", "merchant"],
  dmg: 15,
  health: 35,
  maxHealth: 35,
  sells: SELLS,
  draggable: false,
};
