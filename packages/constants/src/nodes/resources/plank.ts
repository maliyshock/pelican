import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANK: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("plank"),
  type: "plank",
  title: "Plank",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 15,
};
