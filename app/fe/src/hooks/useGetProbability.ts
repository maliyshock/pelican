import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCallback } from "react";
import { EXPLORING, HARVESTING } from "../../../common/src/constants/dictionary.ts";

export function useGetProbability() {
  const player = useSelector((state: RootState) => state.player);

  return useCallback(
    (nodeSpecificAction: string) => {
      if (nodeSpecificAction === HARVESTING) {
        return player.harvest.harvestRate;
      }

      if (nodeSpecificAction === EXPLORING) {
        return player.explore.exploreRate;
      }
    },
    [player.explore.exploreRate, player.harvest.harvestRate],
  );
}
