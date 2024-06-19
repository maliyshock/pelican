import { useCallback } from "react";
import { ActionKind } from "@pelican/constants";

export function useGetProbability() {
  // const player = useSelector((state: RootState) => state.player);

  return useCallback((nodeSpecificAction: ActionKind) => {
    if (nodeSpecificAction === "harvest") {
      // return player.harvest.harvestRate;
    }

    if (nodeSpecificAction === "explore") {
      // return player.explore.exploreRate;
    }
  }, []);
}
