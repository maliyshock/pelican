import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const EGG: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("egg"),
  type: "egg",
  title: "",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 3,
  health: 1,
  draggable: true,
};
