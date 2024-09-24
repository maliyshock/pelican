import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const ANTHILL: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("stone-deposit"),
  type: "stone-deposit",
  title: "Anthill",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
  draggable: true,
};
