import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const GOOSE_GRASS: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("goose-grass"),
  type: "goose-grass",
  title: "Goose Grass",
  roles: ["herb", "food", "ingredient"],
  price: 3,
  nutrition: 1,
  onConsume: { "health-regen": 3 },
  health: 1,
};
