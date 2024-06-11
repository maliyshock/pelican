import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const STONE_DEPOSIT: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("stone-deposit"),
  type: "stone-deposit",
  title: "Stone Deposit",
  roles: ["resource-deposit"],
  health: 3,
  price: 1,
};
