import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const POOP: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("poop"),
  type: "poop",
  title: "",
  roles: ["food", "fertilizer", "resource"],
  price: 2,
  health: 1,
};
