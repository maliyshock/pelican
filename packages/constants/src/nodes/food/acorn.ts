import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const ACORN: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("acorn"),
  type: "acorn",
  title: "Acorn",
  roles: ["food", "ingredient"],
  price: 2,
};
