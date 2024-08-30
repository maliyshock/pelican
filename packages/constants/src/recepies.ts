import { GameNodeData } from "~/types/game-node";
import { FIRE_PLACE } from "~/nodes/buildings/buildings";

import { CONCAT_SYMBOL } from "~/constants";
import { ResourceKind } from "~/types/build/resource";

interface Recipe {
  requires: ResourceKind[];
  gives: GameNodeData;
}

const something: Recipe = {
  requires: ["wood", "wood"],
  gives: FIRE_PLACE,
};

const firePlace: Recipe = {
  requires: ["stick", "stick", "flint"],
  gives: FIRE_PLACE,
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
RECIPES_BOOK.add(something);

export { RECIPES_BOOK };
