import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const STICK: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("stick"),
  type: "stick",
  title: "Stick",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 6,
};
