import { Digestion } from "@pelican/constants";
import { getCurrentMaxSatiety } from "~/utils/get-current-max-satiety.ts";

export function useGetCurrentMaxSatiety(digestion?: Digestion) {
  if (!digestion) return undefined;
  const { maxSatiety, hungerStack } = digestion;

  return getCurrentMaxSatiety(maxSatiety, hungerStack);
}
