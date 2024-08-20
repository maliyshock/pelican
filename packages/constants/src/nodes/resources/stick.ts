import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const STICK: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("stick"),
  type: "stick",
  title: "Stick",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 6,
};
