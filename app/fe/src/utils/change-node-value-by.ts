import { GameNode } from "@pelican/constants";
import { cloneDeep, get, set } from "lodash";
import { factorial } from "~/utils/factorial.ts";
import { getCurrentMaxSatiety } from "~/utils/get-current-max-satiety.ts";
import { isObject } from "lodash";

type Change = {
  keys: string[];
  value?: any; // can be anything
};

interface ChangeValueBy {
  nodes: GameNode[];
  ids: string[];
  changes: Change[];
}

interface ManageSatiety {
  node: GameNode;
  prevValue: number;
  value: number;
}

export function manageSatiety({ node, prevValue, value }: ManageSatiety) {
  const { health } = node.data;
  const { hungerStack, maxSatiety, minSatiety } = node.data.profile!.digestion;
  const currentMaxSatiety = hungerStack > 0 ? getCurrentMaxSatiety(maxSatiety, hungerStack) : maxSatiety;

  if (prevValue + value === minSatiety) {
    const newHungerStack = hungerStack + 1;
    const newSatiety = getCurrentMaxSatiety(maxSatiety, newHungerStack);
    const takeDamage = factorial(newHungerStack) * 2 + 3;

    set(node, ["data", "profile", "digestion", "hungerStack"], newHungerStack);
    set(node, ["data", "profile", "digestion", "satiety"], newSatiety);
    set(node, ["data", "health"], (health as number) - takeDamage);
    set(node, ["data", "speedPenaltyLevel"], 2);
  } else if (prevValue + value > currentMaxSatiety) {
    if (hungerStack === 0) {
      // TODO: set gluttony
      set(node, ["data", "profile", "digestion", "satiety"], currentMaxSatiety);
    } else {
      const newHungerStack = hungerStack - 1;
      const newSatiety = prevValue + value - currentMaxSatiety;

      set(node, ["data", "profile", "digestion", "hungerStack"], newHungerStack);
      set(node, ["data", "profile", "digestion", "satiety"], newSatiety);
    }
  } else {
    set(node, ["data", "profile", "digestion", "satiety"], prevValue + value);
  }
}

// TODO: refactor this. This looks awefull
// supports only numbers for now
export function changeNodeValueBy({ nodes, ids, changes }: ChangeValueBy) {
  return nodes.map(node => {
    if (ids.includes(node.id)) {
      const newNode = cloneDeep(node);

      changes.forEach(change => {
        const { keys, value } = change;
        const prevValue = get(newNode, keys);

        if (keys.includes("satiety")) {
          manageSatiety({ node: newNode, prevValue, value: value as number });
        } else if (keys.includes("health")) {
          // TODO: it should be generalized
          const max = get(newNode, ["data", "maxHealth"]);

          set(newNode, keys, max ? Math.min(prevValue + value, max) : prevValue + value);
        } else {
          if (Array.isArray(value)) {
            set(newNode, keys, [...prevValue, ...value]);
          } else if (isObject(value)) {
            set(newNode, keys, { ...prevValue, ...(value as object) });
          } else {
            set(newNode, keys, prevValue + value);
          }
        }
      });

      return newNode;
    }

    return node;
  });
}
