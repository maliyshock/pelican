import { GameNodeData } from "~/types/game-node";
import { createSocket } from "@pelican/utils";
import { createImg } from "@pelican/utils";

export const CLAY_DEPOSIT: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("clay-deposit"),
  type: "clay-deposit",
  title: "Clay deposit",
  roles: ["resource-deposit"],
  health: 3,
  price: 1,
  draggable: true,
};
