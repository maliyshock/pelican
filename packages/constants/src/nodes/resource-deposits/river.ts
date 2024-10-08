import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const RIVER: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("river"),
  type: "river",
  title: "River",
  roles: ["resource-deposit"],
  health: 3,
  price: 1,
  description:
    "the planet's restless vein, carving paths through valleys and forests, sustaining life along its journey, and offering endless opportunities for exploration and adventure for those who dare to follow its flow",
  draggable: true,
};
