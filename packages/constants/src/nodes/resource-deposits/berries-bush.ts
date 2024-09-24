import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BERRIES_BUSH: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("berries-bush"),
  type: "berries-bush",
  title: "Berries bush",
  roles: ["resource-deposit"],
  price: 1,
  health: 3,
  description:
    "Small Bush with Juicy Berries: nature's snack bar, conveniently bite-sized and packed with a burst of flavor, perfect for foragers and hungry hikers looking for a sweet, tangy treat straight from the wild.",
  draggable: true,
};
