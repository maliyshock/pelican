import { useCallback } from "react";
import { ActionKind, GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useGetEat } from "~/hooks/use-get-action/use-get-eat.ts";
import { useGetExplore } from "~/hooks/use-get-action/use-get-explore.ts";
import { useGetHarvest } from "~/hooks/use-get-action/use-get-harvest.ts";

interface GetActionArgs {
  targetNode: GameNode;
  actorNode: GameNode;
  nodeSpecificAction?: ActionKind;
}

export function useGetActionCallback() {
  const { setComplete } = useStore(store => store.resourceGroups);
  const { setTalk } = useStore(store => store.talk);
  const eat = useGetEat();
  const explore = useGetExplore();
  const harvest = useGetHarvest();

  return useCallback(
    ({ targetNode, actorNode, nodeSpecificAction }: GetActionArgs) =>
      () => {
        if (nodeSpecificAction === "eat") {
          eat(actorNode, targetNode);
        }

        if (nodeSpecificAction === "talk") {
          setTalk(targetNode.id);
        }

        if (nodeSpecificAction === "explore") {
          explore(actorNode, targetNode);
        }

        if (nodeSpecificAction === "harvest") {
          harvest(targetNode);
        }

        if (nodeSpecificAction === "craft") {
          setComplete(targetNode.id);
        }
      },
    [eat, explore, harvest, setComplete, setTalk],
  );
}
