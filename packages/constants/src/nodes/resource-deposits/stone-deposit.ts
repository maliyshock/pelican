import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const STONE_DEPOSIT: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("stone-deposit"),
  type: "stone-deposit",
  title: "Stone Deposit",
  roles: ["resource-deposit"],
  health: 3,
  price: 1,
  draggable: true,
};
