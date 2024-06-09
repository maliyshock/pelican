// just a reminder, remove later
// const rarityMap = {
//   "basic": 0,
//   "common": 1,
//   "rare": 3,
//   "really-really-rare": 4,
//   "unique": 2,
//   "legendary": 5,
// };

import { GameNodeData, ResourceContainer } from "~/types/game-node";
import { TREE } from "~/nodes/resource-deposits/tree";
import { STONE } from "~/nodes/resources/stone";
import { STONE_DEPOSIT } from "~/nodes/resource-deposits/stone-deposit";
import { POOP } from "~/nodes/others/poop";
import { PLANK } from "~/nodes/resources/plank";
import { WOOD } from "~/nodes/resources/wood";

export const RESOURCE_CONTAINERS: {
  [K in ResourceContainer]?: Array<Array<GameNodeData>>;
} = {
  "forest": [[TREE, STONE, STONE_DEPOSIT], [POOP], [PLANK]],
  "tree": [[WOOD], [], []], // apple // nut // stick // leaf
  "stone-deposit": [[STONE]],
};
