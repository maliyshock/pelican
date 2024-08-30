import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const LEAFS: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("leafs"),
  type: "leafs",
  title: "Leafs",
  roles: ["resource"],
  price: 2,
};
