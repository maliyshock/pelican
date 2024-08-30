import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const TEST_STRUCTURE_ENTITY: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "target_0" })],
  img: createImg(""),
  dmg: 1,
  health: 10,
  type: "building",
  roles: ["building"],
};

export const FIRE_PLACE: GameNodeData = {
  inputs: [createSocket({ id: "source_0", type: "fuel" })],
  outputs: [createSocket({ id: "target_0", type: "heat" }), createSocket({ id: "target_1", type: "heat" })],
  img: createImg("fire-place"),
  title: "Fire Place",
  type: "building",
  roles: ["fire-source"],
  health: 3,
  fire: {
    max: 150,
    amount: 50,
    maxOutputHeat: 5,
    speed: 2000,
  },
  price: 5,
};
