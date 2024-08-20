import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const GOOSE_GRASS: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("goose-grass"),
  type: "goose-grass",
  title: "Goose Grass",
  roles: ["herb", "food", "ingredient"],
  price: 3,
  nutrition: 1,
  onConsume: { "health-regen": 3 },
  health: 1,
};
