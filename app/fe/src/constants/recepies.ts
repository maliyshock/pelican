import { STONE, WOOD } from "../../../common/src/constants/dictionary.ts";
import { GameNodeData } from "../../../common/src/types";
import { FIRE_PLACE, STONE_WALL } from "../../../nodes/buildings/buildings.ts";
import { CONCAT_SYMBOL } from "./index.ts";
import { Resource } from "../../../common/src/types/resource.ts";

interface Recipe {
  requires: Resource[];
  gives: GameNodeData;
}

const firePlace: Recipe = {
  requires: [WOOD],
  gives: FIRE_PLACE,
};

const stoneWall: Recipe = {
  requires: [STONE, STONE],
  gives: STONE_WALL,
};

class RecipesBook {
  items: { [key: string]: Recipe } = {};

  constructor() {
    this.items = {};
  }

  add(recipe: Recipe) {
    const key = recipe.requires.join(CONCAT_SYMBOL);

    this.items[key] = recipe;
  }

  find(recipe: string): Recipe | undefined {
    return this.items[recipe];
  }
}

const RECIPES_BOOK = new RecipesBook();

RECIPES_BOOK.add(firePlace);
RECIPES_BOOK.add(stoneWall);

export { RECIPES_BOOK };
