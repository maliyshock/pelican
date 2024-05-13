import { PLAYER, WOOD } from "~/constants/dictionary.ts";
import { joinStrings } from "~/utils/join-strings.ts";

const FIRE_PLACE: string[] = [PLAYER, WOOD, WOOD, WOOD];

class Recipes {
  items: { [key: string]: string[] } = {};

  constructor() {
    this.items = {};
  }

  add(recipe: string[]) {
    const key = joinStrings(recipe);

    this.items[key] = recipe;
  }
}

export const RECIPES = new Recipes();
RECIPES.add(FIRE_PLACE);
