import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const EGG: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("egg"),
  type: "egg",
  title: "",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 3,
};
